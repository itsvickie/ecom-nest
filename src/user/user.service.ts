import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { MailerService } from '@Mailer/mailer.service';
import { PasswordHelper } from '@Helpers/password.hash';
import { CreateUserDto } from './dto/request/create-user.dto';
import { SignInUserDto } from './dto/request/signin-user.dto';
import { CustomException } from '@Exceptions/custom.exception';
import { EnvironmentService } from '@Envs/environments.service';
import { SignInUserResponseDto } from './dto/response/signin-user.dto';
import { CustomExceptionMessages } from '@Exceptions/custom.exception.message';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly passwordHelper: PasswordHelper,
    private readonly userRepository: UserRepository,
    private readonly environmentsService: EnvironmentService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    createUserDto.password = await this.passwordHelper.hashPassword(
      createUserDto.password,
    );

    // TODO: Implementar Fila
    try {
      const userCreated = await this.userRepository.create(createUserDto);

      await this.mailerService.sendConfirmAccountEmail(
        userCreated.email,
        userCreated.validate_code,
      );
    } catch (error) {
      throw new CustomException(
        CustomExceptionMessages.E_INTERNAL_SERVER_ERROR,
      );
    }

    // TODO: Exceptions
    // TODO: Criar validações customizadas
  }

  // TODO: Create a auth service with jwt strategy
  async signIn(signInUserDto: SignInUserDto): Promise<SignInUserResponseDto> {
    const user = await this.userRepository.findUserByEmail(signInUserDto.email);
    if (!user)
      throw new CustomException(CustomExceptionMessages.E_INVALID_CREDENTIALS);

    const plainTextPassword = signInUserDto.password;
    const hashPassword = user.password;
    delete user.password;

    const isPasswordCorrect = await this.passwordHelper.comparePassword(
      plainTextPassword,
      hashPassword,
    );
    if (!isPasswordCorrect)
      throw new CustomException(CustomExceptionMessages.E_INVALID_CREDENTIALS);

    const payload = {
      id: user.id,
      access_level: user.access_level,
    };

    // TODO: Estudar sobre refresh token
    const access_token = await this.jwtService.signAsync(payload, {
      privateKey: this.environmentsService.getJwtSecret,
    });

    return { access_token, user: payload };
  }

  async activeAccount(validateCode: string): Promise<void> {
    await this.userRepository.activeUserByValidateCode(validateCode);
  }
}
