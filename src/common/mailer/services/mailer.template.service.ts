import { Injectable } from '@nestjs/common';

import { MailerEnvironmentVariableService } from './mailer.environments-variable.service';

@Injectable()
export class MailerTemplateService {
  constructor(
    private readonly mailerEnvironmentVariable: MailerEnvironmentVariableService,
  ) {}

  templateConfirmAccount(confirmCode: string) {
    return `<!DOCTYPE html>
    <html>
    <head>
        <title>Confirme sua conta</title>
    </head>
    <body>
        <h1>Olá!</h1>
        <p>Por favor clique no botão abaixo para confirmar sua conta!</p>
        <a href="${this.mailerEnvironmentVariable.getConfirmAccountUrl(
          confirmCode,
        )}" target="_blank" style="display:inline-block; background-color:#008CBA; color:#fff; padding:12px 20px; text-decoration:none; border-radius:4px;">Clique Aqui</a>
        <p>Obrigado!</p>
    </body>
    </html>
    `;
  }
}
