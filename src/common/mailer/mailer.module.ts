import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule as Mailer } from '@nestjs-modules/mailer';

import { QueueService } from '@Queue/queue.service';
import { MailerService } from './services/mailer.service';
import { MailerTemplateService } from './services/mailer.template.service';
import { EnvironmentVariablesService } from '@Envs/environments-variables.service';
import { MailerEnvironmentVariableService } from './services/mailer.environments-variable.service';

@Module({
  imports: [
    Mailer.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        secure: false,
        port: process.env.MAIL_PORT,
        ignoreTLS: true,
      },
      defaults: {
        from: process.env.MAIL_FROM,
      },
    }),
  ],
  providers: [
    QueueService,
    MailerService,
    ConfigService,
    MailerTemplateService,
    EnvironmentVariablesService,
    MailerEnvironmentVariableService,
  ],
})
export class MailerModule {}
