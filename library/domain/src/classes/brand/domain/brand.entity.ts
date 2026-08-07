import { Expose, Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { BrandImageEntity } from './brand-image.entity.ts';

export class BrandEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsNumber()
  version: number;

  @Expose()
  @IsString()
  code: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @ValidateNested()
  @Type(() => BrandImageEntity)
  @IsOptional()
  image?: BrandImageEntity | null;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
