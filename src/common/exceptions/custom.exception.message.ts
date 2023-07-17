import { HttpStatus } from '@nestjs/common';

import { ExceptionCodes } from './custom.exception.codes.enum';
import { ExceptionMessageInterface } from './custom.exception.interface';

export const CustomExceptionMessages: ExceptionMessageInterface = {
  E_INTERNAL_SERVER_ERROR: {
    message: ExceptionCodes.E_INTERNAL_SERVER_ERROR,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  E_INVALID_CREDENTIALS: {
    message: ExceptionCodes.E_INVALID_CREDENTIALS,
    statusCode: HttpStatus.NOT_FOUND,
  },
  E_MUST_BE_A_STRING: {
    message: ExceptionCodes.E_MUST_BE_A_STRING,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  },
  E_MUST_BE_A_NUMBER: {
    message: ExceptionCodes.E_MUST_BE_A_NUMBER,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  },
  E_INVALID_EMAIL: {
    message: ExceptionCodes.E_INVALID_EMAIL,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  },
  E_INVALID_MIN_LENGTH: {
    message: ExceptionCodes.E_INVALID_MIN_LENGTH,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  },
  E_INVALID_ACCESS_LEVEL: {
    message: ExceptionCodes.E_INVALID_ACCESS_LEVEL,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  },
  E_NOT_FOUND: {
    message: ExceptionCodes.E_NOT_FOUND,
    statusCode: HttpStatus.NOT_FOUND,
  },
  E_INVALID_AUTHORIZATION_HEADER: {
    message: ExceptionCodes.E_INVALID_AUTHORIZATION_HEADER,
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  E_UNAUTHORIZED: {
    message: ExceptionCodes.E_UNAUTHORIZED,
    statusCode: HttpStatus.UNAUTHORIZED,
  },
};
