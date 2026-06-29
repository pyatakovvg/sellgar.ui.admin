import { Type, Expose } from 'class-transformer';
import { IsOptional, IsString, IsUUID, ValidateNested, IsDateString, IsNumber, IsBoolean } from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';
import { ImageEntity } from '../variant/variant.entity.ts';

export class CategoryImageEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsUUID()
  categoryUuid: string;

  @Expose()
  @IsUUID()
  imageUuid: string;

  @Expose()
  @IsNumber()
  sortOrder: number;

  @Expose()
  @IsBoolean()
  isPrimary: boolean;

  @Expose()
  @IsString()
  @IsOptional()
  alt?: string | null;

  @Expose()
  @ValidateNested()
  @Type(() => ImageEntity)
  image: ImageEntity;
}

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
  parentUuid?: string;

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

  @Expose()
  @ValidateNested()
  @Type(() => CategoryEntity)
  children: CategoryEntity[];

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}

export class CategoryResultEntity {
  @Expose()
  @ValidateNested()
  @Type(() => CategoryEntity)
  data: CategoryEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
