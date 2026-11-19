import { Expose } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class SignInDto {
  @Expose()
  @IsString()
  login: string;

  @Expose()
  @IsString()
  @MinLength(1)
  password: string;
}
