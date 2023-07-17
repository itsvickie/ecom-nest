import { INestApplication } from '@nestjs/common';

import { EnvironmentVariablesService } from '@Envs/environments-variables.service';

export const initEnvironmentVariables = (app: INestApplication) => {
  return app.get(EnvironmentVariablesService);
};
