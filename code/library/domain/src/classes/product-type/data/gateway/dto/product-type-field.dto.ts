import { Expose } from 'class-transformer';
import { IsBoolean, IsInt, IsString, MaxLength, Min, MinLength } from 'class-validator';

import type { ProductTypeFieldInput } from '../input/product-type-field.input.ts';

export class ProductTypeFieldDto implements ProductTypeFieldInput {
  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  propertyCode: string;

  @Expose()
  @IsBoolean()
  required: boolean;

  @Expose()
  @IsBoolean()
  multiple: boolean;

  @Expose()
  @IsInt()
  @Min(0)
  sortOrder: number;
}
