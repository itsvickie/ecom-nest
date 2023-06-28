import { HttpStatus } from '@nestjs/common';

import { ExceptionCodes } from './custom.exception.codes.enum';

export interface CustomInterface {
  message: string;
  statusCode: HttpStatus;
}

export type ExceptionMessageInterface = {
  [key in ExceptionCodes]: CustomInterface;
};
