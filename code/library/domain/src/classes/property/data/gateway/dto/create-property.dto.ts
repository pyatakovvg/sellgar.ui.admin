import { Expose, Type } from 'class-transformer';
import { IsArray, IsIn, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';

import type { CreatePropertyInput } from '../input/create-property.input.ts';
import { PropertyOptionDto } from './property-option.dto.ts';

export class CreatePropertyDto implements CreatePropertyInput {
  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  @IsOptional()
  unitCode?: string | null;

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  code: string;

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  name: string;

  @Expose()
  @IsIn(['TEXT', 'INTEGER', 'DECIMAL', 'BOOLEAN', 'DATE', 'OPTIONS'])
  kind: 'TEXT' | 'INTEGER' | 'DECIMAL' | 'BOOLEAN' | 'DATE' | 'OPTIONS';

  @Expose()
  @IsString()
  @IsOptional()
  description?: string | null;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => PropertyOptionDto)
  @IsArray()
  @IsOptional()
  options?: PropertyOptionDto[];
}
