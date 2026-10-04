import { Expose, Type } from 'class-transformer';
import { IsArray, IsInt, IsString, Max, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';

import type { UpdatePropertyOptionInput } from '../input/update-property-option.input.ts';
import { PropertyOptionExtraDto } from './property-option-extra.dto.ts';

export class UpdatePropertyOptionDto implements UpdatePropertyOptionInput {
  @Expose()
  @IsInt()
  @Min(1)
  @Max(2147483647)
  version: number;

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  name: string;

  @Expose()
  @IsInt()
  @Min(0)
  @Max(2147483647)
  sortOrder: number;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PropertyOptionExtraDto)
  extras: PropertyOptionExtraDto[];
}
