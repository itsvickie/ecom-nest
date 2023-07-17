import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { MainModule } from './main.module';
import { HttpExceptionFilter } from '@Exceptions/http-exception.filter';
import { initEnvironmentVariables } from './common/main/environments-variables.init';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const environmentsVariable = initEnvironmentVariables(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(environmentsVariable.getAppPort);
}
bootstrap();
