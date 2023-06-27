import { HttpStatus } from '@nestjs/common';

import { ExceptionMessages } from './custom.exception.messages.enum';
import { ExceptionMessageInterface } from './custom.exception.interface';

export const CustomExceptionMessages: ExceptionMessageInterface = {
  E_INTERNAL_SERVER_ERROR: {
    message: ExceptionMessages.E_INTERNAL_SERVER_ERROR,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  E_INVALID_CREDENTIALS: {
    message: ExceptionMessages.E_INVALID_CREDENTIALS,
    statusCode: HttpStatus.NOT_FOUND,
  },
};
