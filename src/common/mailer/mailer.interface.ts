import { ISendMailOptions } from '@nestjs-modules/mailer';

import { MailerTemplateEnum } from './mailer.enum';

export interface ISendMailerOptions {
  mailOptions: ISendMailOptions;
  templateEmail: MailerTemplateEnum;
  confirmCode?: string;
}
