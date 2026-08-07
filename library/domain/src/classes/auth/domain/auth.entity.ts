import { Expose } from 'class-transformer';
import { IsDateString, IsString } from 'class-validator';

export class AuthEntity {
  @Expose()
  @IsString()
  accessToken: string;

  @Expose()
  @IsString()
  refreshToken: string;

  @Expose()
  @IsDateString()
  expiresAt: string;
}
