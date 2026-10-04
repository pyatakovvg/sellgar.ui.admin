import { Expose, Type } from 'class-transformer';
import { IsArray, IsDateString, IsEnum, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { ProductStatus } from './product-status.enum.ts';
import { ProductFieldEntity } from './product-field.entity.ts';
import { ProductVariantImageEntity } from './product-variant-image.entity.ts';

export class ProductVariantEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  description: string | null;

  @Expose()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductFieldEntity)
  properties: ProductFieldEntity[];

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantImageEntity)
  images: ProductVariantImageEntity[];

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
