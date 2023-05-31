import { Injectable } from '@nestjs/common';

import { PrismaService } from '@Prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    await this.prisma.user.create({ data: createUserDto });
  }
}
