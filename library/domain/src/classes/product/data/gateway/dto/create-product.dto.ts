import { Expose, Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';

import type { CreateProductInput } from '../input/create-product.input.ts';
import { ProductPropertyDto } from './product-property.dto.ts';
import { ProductVariantDto } from './product-variant.dto.ts';

export class CreateProductDto implements CreateProductInput {
  @Expose()
  @IsUUID()
  typeUuid: string;

  @Expose()
  @IsInt()
  @Min(1)
  typeVersion: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string | null;

  @Expose()
  @IsString()
  brandCode: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductPropertyDto)
  @IsOptional()
  properties?: ProductPropertyDto[];

  @Expose()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  variants: ProductVariantDto[];
}
