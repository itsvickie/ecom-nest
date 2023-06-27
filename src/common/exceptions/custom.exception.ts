import { HttpException } from '@nestjs/common';

import { CustomInterface } from './custom.exception.interface';

export class CustomException extends HttpException {
  constructor({ message, statusCode }: CustomInterface) {
    super(message, statusCode);
  }
}
