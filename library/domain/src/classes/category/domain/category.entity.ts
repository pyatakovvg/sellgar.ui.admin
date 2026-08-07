import { Expose, Type } from 'class-transformer';
import { IsArray, IsDateString, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { CategoryImageEntity } from './category-image.entity.ts';

export class CategoryEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsNumber()
  version: number;

  @Expose()
  @IsUUID()
  @IsOptional()
  parentUuid?: string | null;

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
  @Type(() => CategoryImageEntity)
  @IsOptional()
  image?: CategoryImageEntity | null;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryEntity)
  parent?: CategoryEntity;

  @IsArray()
  @Expose()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CategoryEntity)
  children?: CategoryEntity[];

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
