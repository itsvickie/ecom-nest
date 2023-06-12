import { Module } from '@nestjs/common';

import { PrismaModule } from '@Prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EnvironmentService } from '@Envs/environments.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule, EnvironmentService],
})
export class UserModule {}
