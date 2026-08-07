import { Expose, Type } from 'class-transformer';
import { IsDateString, IsEnum, IsString, IsUUID, ValidateNested } from 'class-validator';

import { StoreCatalogStatus } from './store-catalog-status.enum.ts';

import { StoreBrandEntity } from './store-brand.entity.ts';

import { StoreCategoryEntity } from './store-category.entity.ts';

export class StoreProductCatalogEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEnum(StoreCatalogStatus)
  status: StoreCatalogStatus;

  @Expose()
  @ValidateNested()
  @Type(() => StoreBrandEntity)
  brand: StoreBrandEntity;

  @Expose()
  @ValidateNested()
  @Type(() => StoreCategoryEntity)
  category: StoreCategoryEntity;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
