import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import type { ProductVariantInput } from '../input/product-variant.input.ts';
import { ProductPropertyDto } from './product-property.dto.ts';
import { ProductVariantImageDto } from './product-variant-image.dto.ts';

export class ProductVariantDto implements ProductVariantInput {
  @Expose()
  @IsUUID()
  @IsOptional()
  uuid?: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantImageDto)
  @IsOptional()
  images?: ProductVariantImageDto[];

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductPropertyDto)
  properties: ProductPropertyDto[];
}
