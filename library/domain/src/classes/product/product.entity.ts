import { Type, Expose } from 'class-transformer';
import { IsUUID, IsString, ValidateNested, IsDateString, IsOptional } from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';

import { BrandEntity } from '../brand/brand.entity.ts';
import { CategoryEntity } from '../category/category.entity.ts';
import { PropertyEntity } from '../property/property.entity.ts';
import { PriceEntity } from '../price/price.entity.ts';

export class ProductPropertyEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @ValidateNested()
  @Type(() => PropertyEntity)
  property: PropertyEntity;

  @Expose()
  @IsString()
  @IsOptional()
  propertyUuid?: string;

  @Expose()
  @IsString()
  value: string;
}

export class ProductVariantEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  article: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @ValidateNested()
  @Type(() => PriceEntity)
  prices: PriceEntity[];

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}

export class ProductEntity {
  @IsUUID()
  @Expose()
  uuid: string;

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
  @ValidateNested()
  @Type(() => CategoryEntity)
  category: CategoryEntity;

  @Expose()
  @ValidateNested()
  @Type(() => BrandEntity)
  brand: BrandEntity;

  @Expose()
  @ValidateNested()
  @Type(() => ProductVariantEntity)
  variants: ProductVariantEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => ProductPropertyEntity)
  properties: ProductPropertyEntity[];

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
