import { Injectable } from '@nestjs/common';

import { EnvironmentVariablesService } from '@Envs/environments-variables.service';

@Injectable()
export class MailerEnvironmentVariableService {
  constructor(
    private readonly environmentVariableService: EnvironmentVariablesService,
  ) {}

  getConfirmAccountUrl(code: string): string {
    return `${this.environmentVariableService.getEnvironmentUrl}/user/active?code=${code}`;
  }
}
