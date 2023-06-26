import { Module } from '@nestjs/common';

import { PrismaModule } from '@Prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EnvironmentService } from '@Envs/environments.service';
import { MailerService } from '@Mailer/mailer.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule, EnvironmentService, MailerService],
})
export class UserModule {}
