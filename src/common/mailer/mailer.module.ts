import { ConfigModuleOptions } from '@nestjs/config';
import { DynamicModule, Module } from '@nestjs/common';
import { MailerModule as Mailer } from '@nestjs-modules/mailer';

import { MailerService } from './mailer.service';
import { QueueService } from '@Queue/queue.service';

@Module({
  imports: [
    // TODO: Tirar as envs
    // TODO: Tirar a string na linha 20
    Mailer.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        secure: false,
        port: process.env.MAIL_PORT,
        ignoreTLS: true,
      },
      defaults: {
        from: 'teste@gmail.com',
      },
    }),
  ],
})
export class MailerModule {
  static forRoot(options?: ConfigModuleOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: MailerModule,
      providers: [MailerService, QueueService],
      exports: [MailerService],
    };
  }
}
