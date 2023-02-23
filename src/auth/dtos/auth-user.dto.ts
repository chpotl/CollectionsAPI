import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}
