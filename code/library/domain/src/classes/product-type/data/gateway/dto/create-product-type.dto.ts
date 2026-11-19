import { Expose, Type } from 'class-transformer';
import { IsArray, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';

import type { CreateProductTypeInput } from '../input/create-product-type.input.ts';
import { ProductTypeFieldDto } from './product-type-field.dto.ts';

export class CreateProductTypeDto implements CreateProductTypeInput {
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
