import { Type, Expose } from 'class-transformer';
import { IsUUID, IsString, ValidateNested, IsDateString, IsOptional, IsNumber, IsEnum } from 'class-validator';

import { MetaEntity } from '../../../meta.entity.ts';
import { CatalogStatus } from '../../catalog-status.enum.ts';

import { BrandEntity } from '../../brand';
import { VariantEntity } from '../../variant';
import { CategoryEntity } from '../../category';
import { PropertyEntity } from '../../property';

export class ProductPropertyEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @ValidateNested()
  @Type(() => PropertyEntity)
  property: PropertyEntity;

  @Expose()
  @IsUUID()
  propertyUuid: string;

  @Expose()
  @IsUUID()
  @IsOptional()
  optionUuid: string | null;

  @Expose()
  @IsString()
  value: string;

  @Expose()
  @IsNumber()
  order: number;
}

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
  @Type(() => ProductPropertyEntity)
  properties: ProductPropertyEntity[] = [];

  @Expose()
  @ValidateNested()
  @Type(() => VariantEntity)
  variants: VariantEntity[] = [];

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
