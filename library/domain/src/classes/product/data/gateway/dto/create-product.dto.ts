import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import type { CreateProductInput } from '../input/create-product.input.ts';
import { ProductPropertyDto } from './product-property.dto.ts';
import { ProductVariantDto } from './product-variant.dto.ts';

export class CreateProductDto implements CreateProductInput {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsUUID()
  categoryUuid: string;

  @Expose()
  @IsUUID()
  brandUuid: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductPropertyDto)
  @IsOptional()
  properties?: ProductPropertyDto[];

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  variants: ProductVariantDto[];
}
