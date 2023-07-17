import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { MailerService } from '@Mailer/services/mailer.service';
import { PasswordHelper } from '@Helpers/password.hash';
import { ISendMailerOptions } from '@Mailer/mailer.interface';
import { CreateUserDto } from './dto/request/create-user.dto';
import { SignInUserDto } from './dto/request/signin-user.dto';
import { CustomException } from '@Exceptions/custom.exception';
import { EnvironmentVariablesService } from '@Envs/environments-variables.service';
import { SignInUserResponseDto } from './dto/response/signin-user.dto';
import { CustomExceptionMessages } from '@Exceptions/custom.exception.message';
import { MailerTemplateEnum } from '@Mailer/mailer.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly passwordHelper: PasswordHelper,
    private readonly userRepository: UserRepository,
    private readonly environmentsService: EnvironmentVariablesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    createUserDto.password = await this.passwordHelper.hashPassword(
      createUserDto.password,
    );

    try {
      const userCreated = await this.userRepository.create(createUserDto);

      const mailer: ISendMailerOptions = {
        mailOptions: {
          to: userCreated.email,
        },
        templateEmail: MailerTemplateEnum.EMAIL_CONFIRM_ACCOUNT,
        confirmCode: userCreated.validate_code,
      };

      await this.mailerService.sendMail(mailer);
    } catch (e) {
      throw new CustomException(
        CustomExceptionMessages.E_INTERNAL_SERVER_ERROR,
      );
    }
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
    try {
      await this.userRepository.activeUserByValidateCode(validateCode);
    } catch {
      throw new CustomException(
        CustomExceptionMessages.E_INTERNAL_SERVER_ERROR,
      );
    }
  }
}
