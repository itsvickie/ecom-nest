import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { QueueService } from '@Queue/queue.service';
import { PrismaService } from '@Prisma/prisma.service';
import { PasswordHelper } from '@Helpers/password.hash';
import { MailerService } from '@Mailer/services/mailer.service';
import { MailerTemplateService } from '@Mailer/services/mailer.template.service';
import { EnvironmentVariablesService } from '@Envs/environments-variables.service';
import { MailerEnvironmentVariableService } from '@Mailer/services/mailer.environments-variable.service';

@Module({
  imports: [MailerModule],
  controllers: [UserController],
  providers: [
    ConfigService,
    JwtService,
    UserService,
    QueueService,
    PrismaService,
    MailerService,
    MailerService,
    PasswordHelper,
    UserRepository,
    MailerTemplateService,
    EnvironmentVariablesService,
    MailerEnvironmentVariableService,
  ],
})
export class UserModule {}
