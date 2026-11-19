import { Expose, Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

import type { UpdateVariantInput } from '../input/update-variant.input.ts';
import { ProductPropertyDto } from './product-property.dto.ts';
import { ProductVariantImageDto } from './product-variant-image.dto.ts';

export class UpdateVariantDto implements UpdateVariantInput {
  @Expose()
  @IsInt()
  @Min(1)
  version: number;

  @Expose()
  @IsInt()
  @Min(1)
  typeVersion: number;

  @Expose()
  @IsOptional()
  @IsString()
  name?: string;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string | null;

  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductPropertyDto)
  properties?: ProductPropertyDto[];

  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantImageDto)
  images?: ProductVariantImageDto[];
}
