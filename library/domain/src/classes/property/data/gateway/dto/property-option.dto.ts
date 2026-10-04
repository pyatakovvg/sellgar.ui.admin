import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

import type { PropertyOptionInput } from '../input/property-option.input.ts';
import { PropertyOptionExtraDto } from './property-option-extra.dto.ts';

export class PropertyOptionDto implements PropertyOptionInput {
  @Expose()
  @IsString()
  code: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsNumber()
  @IsOptional()
  sortOrder?: number;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => PropertyOptionExtraDto)
  @IsArray()
  @IsOptional()
  extras?: PropertyOptionExtraDto[];
}
