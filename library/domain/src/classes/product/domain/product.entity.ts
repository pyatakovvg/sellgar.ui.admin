import { Expose, Type } from 'class-transformer';
import { IsArray, IsDateString, IsEnum, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Entity } from '@sellgar/app';

import { ProductStatus } from './product-status.enum.ts';

import { BrandEntity } from '../../brand';
import { VariantEntity } from '../../variant';
import { CategoryEntity } from '../../category';

import { ProductPropertyEntity } from './product-property.entity.ts';

@Entity({ identity: 'uuid' })
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
  brandUuid?: string;

  @Expose()
  @IsUUID()
  @IsOptional()
  categoryUuid?: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @Expose()
  @ValidateNested()
  @Type(() => CategoryEntity)
  category: CategoryEntity;

  @Expose()
  @ValidateNested()
  @Type(() => BrandEntity)
  brand: BrandEntity;

  @IsArray()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => ProductPropertyEntity)
  properties: ProductPropertyEntity[];

  @IsArray()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => VariantEntity)
  variants: VariantEntity[];

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
