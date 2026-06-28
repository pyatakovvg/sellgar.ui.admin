import { Type, Expose } from 'class-transformer';
import { IsUUID, IsString, ValidateNested, IsDateString, IsOptional, IsNumber, IsEnum } from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';
import { CatalogStatus } from '../catalog-status.enum.ts';

import { BrandEntity } from '../brand';
import { VariantEntity } from '../variant';
import { CategoryEntity } from '../category';

export class ProductEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsNumber()
  version: number;

  @Expose()
  @IsUUID()
  @IsOptional()
  brandUuid: string;

  @Expose()
  @IsUUID()
  @IsOptional()
  categoryUuid: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsEnum(CatalogStatus)
  status: CatalogStatus;

  @Expose()
  @ValidateNested()
  @Type(() => CategoryEntity)
  category: CategoryEntity;

  @Expose()
  @ValidateNested()
  @Type(() => BrandEntity)
  brand: BrandEntity;

  @Expose()
  @ValidateNested()
  @Type(() => VariantEntity)
  variants: VariantEntity[];

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}

export class ProductResultEntity {
  @Expose()
  @ValidateNested()
  @Type(() => ProductEntity)
  data: ProductEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
