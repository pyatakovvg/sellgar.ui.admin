import { Expose, Type } from 'class-transformer';
import { IsArray, IsInt, IsString, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';

import type { UpdateProductTypeInput } from '../input/update-product-type.input.ts';
import { ProductTypeFieldDto } from './product-type-field.dto.ts';

export class UpdateProductTypeDto implements UpdateProductTypeInput {
  @Expose()
  @IsInt()
  @Min(1)
  version: number;

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  name: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductTypeFieldDto)
  productFields: ProductTypeFieldDto[];

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductTypeFieldDto)
  variantFields: ProductTypeFieldDto[];
}
