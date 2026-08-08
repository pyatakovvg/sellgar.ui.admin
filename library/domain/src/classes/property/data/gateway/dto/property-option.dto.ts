import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import type { PropertyOptionInput } from '../input/property-option.input.ts';
import { PropertyOptionMetadataDto } from './property-option-metadata.dto.ts';

export class PropertyOptionDto implements PropertyOptionInput {
  @Expose()
  @IsUUID()
  @IsOptional()
  uuid?: string;

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
  @Type(() => PropertyOptionMetadataDto)
  @IsArray()
  @IsOptional()
  metadata?: PropertyOptionMetadataDto[];
}
