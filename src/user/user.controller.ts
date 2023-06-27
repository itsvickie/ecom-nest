import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { SignInUserDto } from './dto/request/signin-user.dto';
import { SignInUserResponseDto } from './dto/response/signin-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.userService.create(createUserDto);
  }

  @Post('/signin')
  async signIn(
    // TODO: Implementar o filter exception
    @Body() signInUserDto: SignInUserDto,
  ): Promise<SignInUserResponseDto> {
    return await this.userService.signIn(signInUserDto);
  }

  @Get('/active')
  async activeAccount(@Query('code') code: string): Promise<void> {
    await this.userService.activeAccount(code);
  }
}
