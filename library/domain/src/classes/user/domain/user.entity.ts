import { Expose } from 'class-transformer';
import { IsBoolean, IsDateString, IsString, IsUUID } from 'class-validator';

export class UserEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  login: string;

  @Expose()
  @IsBoolean()
  isBlocked: boolean;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
