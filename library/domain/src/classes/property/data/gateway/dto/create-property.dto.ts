import { Expose, Type } from 'class-transformer';
import { IsArray, IsIn, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import type { CreatePropertyInput } from '../input/create-property.input.ts';
import { PropertyOptionDto } from './property-option.dto.ts';

export class CreatePropertyDto implements CreatePropertyInput {
  @Expose()
  @IsUUID()
  @IsOptional()
  unitUuid?: string | null;

  @Expose()
  @IsString()
  code: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsIn(['TEXT', 'NUMBER', 'BOOLEAN', 'OPTION', 'DATE'])
  type: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'OPTION' | 'DATE';

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => PropertyOptionDto)
  @IsArray()
  @IsOptional()
  options?: PropertyOptionDto[];
}
