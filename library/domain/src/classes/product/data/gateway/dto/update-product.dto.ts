import { Expose, Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

import type { UpdateProductInput } from '../input/update-product.input.ts';
import { ProductPropertyDto } from './product-property.dto.ts';

export class UpdateProductDto implements UpdateProductInput {
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
  @IsString()
  brandCode?: string;

  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductPropertyDto)
  properties?: ProductPropertyDto[];
}
