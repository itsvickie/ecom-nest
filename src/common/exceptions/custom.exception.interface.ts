import { HttpStatus } from '@nestjs/common';

import { ExceptionMessages } from './custom.exception.messages.enum';

export interface CustomInterface {
  message: string;
  statusCode: HttpStatus;
}

export type ExceptionMessageInterface = {
  [key in ExceptionMessages]: CustomInterface;
};
