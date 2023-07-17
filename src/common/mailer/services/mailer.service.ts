import { Job, Worker } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { MailerService as Service } from '@nestjs-modules/mailer';

import { QueuesKeys } from '@Queue/queue.enum';
import { QUEUES_MAP } from '@Queue/queue.constant';
import { QueueService } from '@Queue/queue.service';
import { MailerTemplateEnum } from '../mailer.enum';
import { ISendMailerOptions } from '@Mailer/mailer.interface';
import { MailerTemplateService } from './mailer.template.service';
import { EnvironmentVariablesService } from '@Envs/environments-variables.service';

@Injectable()
export class MailerService {
  private worker: Worker;

  constructor(
    private readonly mailerService: Service,
    private readonly queueService: QueueService,
    private readonly mailerTemplateService: MailerTemplateService,
    private readonly environmentService: EnvironmentVariablesService,
  ) {
    this.worker = new Worker(
      QUEUES_MAP.get(QueuesKeys.MAILER),
      async (job: Job) => this.mailerService.sendMail(job.data),
      {
        connection: this.environmentService.getRedisConnectionConfig,
      },
    );
  }

  async sendMail({
    mailOptions,
    templateEmail,
    confirmCode,
  }: ISendMailerOptions) {
    let template: Buffer | string = mailOptions.html ? mailOptions.html : null;

    switch (templateEmail) {
      case MailerTemplateEnum.EMAIL_CONFIRM_ACCOUNT:
        template =
          this.mailerTemplateService.templateConfirmAccount(confirmCode);
    }

    this.queueService
      .getQueue(QUEUES_MAP.get(QueuesKeys.MAILER))
      .add(`${templateEmail}:${mailOptions.to}`, {
        ...mailOptions,
        html: template,
      });
  }
}
