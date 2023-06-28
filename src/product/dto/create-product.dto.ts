import { IsNumber, IsOptional, IsString } from 'class-validator';

import { ExceptionCodes } from '@Exceptions/custom.exception.codes.enum';

export class CreateProductDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString({ message: ExceptionCodes.E_MUST_BE_A_STRING })
  name: string;

  @IsString({ message: ExceptionCodes.E_MUST_BE_A_STRING })
  @IsOptional()
  description: string;

  @IsString({ message: ExceptionCodes.E_MUST_BE_A_STRING })
  image_key: string;

  @IsNumber({}, { message: ExceptionCodes.E_MUST_BE_A_NUMBER })
  price: number;
}
