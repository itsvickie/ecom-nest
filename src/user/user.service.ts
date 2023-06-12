import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { UserRepository } from './user.repository';
import { PasswordHelper } from '@Helpers/password.hash';
import { CreateUserDto } from './dto/request/create-user.dto';
import { SignInUserDto } from './dto/request/signin-user.dto';
import { EnvironmentService } from '@Envs/environments.service';
import { SignInUserResponseDto } from './dto/response/signin-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHelper: PasswordHelper,
    private readonly jwtService: JwtService,
    private readonly environmentsService: EnvironmentService,
    private readonly mailerService: MailerService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    createUserDto.password = await this.passwordHelper.hashPassword(
      createUserDto.password,
    );

    // TODO: Ver os parâmetros necessários
    await this.mailerService.sendMail({ to: createUserDto.email, html: 'hey' });
    await this.userRepository.create(createUserDto);
  }

  // TODO: Create a auth service with jwt strategy
  async signIn(signInUserDto: SignInUserDto): Promise<SignInUserResponseDto> {
    const user = await this.userRepository.findUserByEmail(signInUserDto.email);

    if (user) {
      const plainTextPassword = signInUserDto.password;
      const hashPassword = user.password;
      delete user.password;

      const isPasswordCorrect = await this.passwordHelper.comparePassword(
        plainTextPassword,
        hashPassword,
      );
      if (isPasswordCorrect) {
        const payload = {
          id: user.id,
          access_level: user.access_level,
        };
        const access_token = await this.jwtService.signAsync(payload, {
          privateKey: process.env.JWT_SECRET,
        });

        return { access_token, user: payload };
      }
    }
  }
}
