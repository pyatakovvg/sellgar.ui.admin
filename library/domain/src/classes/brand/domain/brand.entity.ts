import { Expose, Type } from 'class-transformer';
import { Entity } from '@sellgar/app';
import { IsArray, IsDateString, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';

import { BrandImageEntity } from './brand-image.entity.ts';

@Entity({ identity: 'code' })
export class BrandEntity {
  @Expose()
  @IsString()
  code: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  description: string | null;

  @Expose()
  @IsInt()
  version: number;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BrandImageEntity)
  images: BrandImageEntity[];

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
