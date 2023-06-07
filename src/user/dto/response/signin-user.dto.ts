import { IsObject, IsString } from 'class-validator';

export class SignInUserResponseDto {
  @IsString()
  access_token: string;

  @IsObject()
  user: {
    id: string;
    access_level: string;
  };
}
