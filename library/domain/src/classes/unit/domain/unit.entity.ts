import { Expose } from 'class-transformer';
import { IsDateString, IsInt, IsString } from 'class-validator';

export class UnitEntity {
  @Expose()
  @IsString()
  code: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  symbol: string;

  @Expose()
  @IsInt()
  version: number;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
