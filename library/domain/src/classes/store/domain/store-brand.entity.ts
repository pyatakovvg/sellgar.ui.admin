import { Expose } from 'class-transformer';
import { IsDateString, IsString, IsUUID } from 'class-validator';

export class StoreBrandEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
