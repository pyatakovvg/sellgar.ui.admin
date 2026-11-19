import { Expose } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';
import { Entity } from '@sellgar/app';

@Entity({ identity: 'code' })
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
  @IsOptional()
  @IsString()
  description: string | null;

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
