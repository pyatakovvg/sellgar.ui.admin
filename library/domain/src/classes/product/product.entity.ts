import { Type, Expose } from 'class-transformer';
import { IsUUID, IsString, ValidateNested, IsDateString, IsOptional } from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';

import { BrandEntity } from '../brand';
import { CategoryEntity } from '../category';
import { PropertyEntity } from '../property';
import { ProductVariantEntity } from '../product-variant';

export class ProductPropertyEntity {
  @IsUUID()
  uuid: string;

  @ValidateNested()
  @Type(() => PropertyEntity)
  property: PropertyEntity;

  @IsString()
  @IsOptional()
  propertyUuid?: string;

  @Expose()
  @IsString()
  value: string;
}

export class ProductEntity {
  @IsUUID()
  uuid: string;

  @IsUUID()
  @IsOptional()
  brandUuid: string;

  @IsUUID()
  @IsOptional()
  categoryUuid: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @ValidateNested()
  @Type(() => CategoryEntity)
  category: CategoryEntity;

  @ValidateNested()
  @Type(() => BrandEntity)
  brand: BrandEntity;

  @ValidateNested()
  @Type(() => ProductVariantEntity)
  variants: ProductVariantEntity[];

  @ValidateNested()
  @Type(() => ProductPropertyEntity)
  properties: ProductPropertyEntity[];

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}

export class ProductResultEntity {
  @ValidateNested()
  @Type(() => ProductEntity)
  data: ProductEntity[];

  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
