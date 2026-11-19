import { Expose, Type } from 'class-transformer';
import { IsInt, Max, Min, ValidateNested } from 'class-validator';

import { PropertyOptionDto } from './property-option.dto.ts';

export class CreatePropertyOptionDto {
  @Expose()
  @IsInt()
  @Min(1)
  @Max(2147483647)
  version: number;

  @Expose()
  @ValidateNested()
  @Type(() => PropertyOptionDto)
  option: PropertyOptionDto;
}
