import { Expose, Type } from 'class-transformer';
import { IsArray, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';

import type { ProductPropertyInput } from '../input/product-property.input.ts';
import { PropertyValueDto } from './property-value.dto.ts';

export class ProductPropertyDto implements ProductPropertyInput {
  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  propertyCode: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PropertyValueDto)
  values: PropertyValueDto[];
}
