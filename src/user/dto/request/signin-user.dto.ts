import { IsString } from 'class-validator';

import { ExceptionCodes } from '@Exceptions/custom.exception.codes.enum';

export class SignInUserDto {
  @IsString({ message: ExceptionCodes.E_MUST_BE_A_STRING })
  email: string;

  @IsString({ message: ExceptionCodes.E_MUST_BE_A_STRING })
  password: string;
}
