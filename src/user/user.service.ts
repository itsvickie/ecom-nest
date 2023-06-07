import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { PasswordHelper } from '@Helpers/password.hash';
import { CreateUserDto } from './dto/request/create-user.dto';
import { SignInUserDto } from './dto/request/signin-user.dto';
import { SignInUserResponseDto } from './dto/response/signin-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHelper: PasswordHelper,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    createUserDto.password = await this.passwordHelper.hashPassword(
      createUserDto.password,
    );

    await this.userRepository.create(createUserDto);
  }

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
        const access_token = await this.jwtService.signAsync(payload);

        return { access_token, user: payload };
      }
    }
  }
}
