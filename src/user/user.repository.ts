import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@Prisma/prisma.service';
import { CreateUserDto } from './dto/request/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    await this.prismaService.user.create({ data: createUserDto });
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }
}
