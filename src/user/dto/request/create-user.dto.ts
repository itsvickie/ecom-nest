import {
  IsEnum,
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';

import { UserRolesEnum } from '../../enum/user.roles.enum';
import { ExceptionCodes } from '@Exceptions/custom.exception.codes.enum';

export class CreateUserDto {
  @IsString({ message: ExceptionCodes.E_MUST_BE_A_STRING })
  name: string;

  @IsEmail({}, { message: ExceptionCodes.E_INVALID_EMAIL })
  email: string;

  @IsString({ message: ExceptionCodes.E_MUST_BE_A_STRING })
  @MinLength(8, { message: ExceptionCodes.E_INVALID_MIN_LENGTH })
  password: string;

  @IsString({ message: ExceptionCodes.E_MUST_BE_A_STRING })
  @IsEnum(UserRolesEnum, { message: ExceptionCodes.E_INVALID_ACCESS_LEVEL })
  @IsOptional()
  access_level?: 'admin' | 'regular';
}
