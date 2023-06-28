import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { MainModule } from './main.module';
import { HttpExceptionFilter } from '@Exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
