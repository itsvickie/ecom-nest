import { Injectable } from '@nestjs/common';
import { MailerService as Service } from '@nestjs-modules/mailer';

import { templateConfirmAccount } from './mailer.template';
import { QueueService } from '@Queue/queue.service';

@Injectable()
export class MailerService {
  constructor(
    private readonly mailerService: Service,
    private readonly queueService: QueueService,
  ) {}

  async sendConfirmAccountEmail(
    toEmail: string,
    confirmCode: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: toEmail,
      subject: 'Confirm your account',
      html: templateConfirmAccount(confirmCode),
    });
  }
}
