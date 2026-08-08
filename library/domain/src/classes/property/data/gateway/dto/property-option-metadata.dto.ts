import { Expose } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

import type { PropertyOptionMetadataInput } from '../input/property-option-metadata.input.ts';

export class PropertyOptionMetadataDto implements PropertyOptionMetadataInput {
  @Expose()
  @IsUUID()
  @IsOptional()
  uuid?: string;

  @Expose()
  @IsIn(['TEXT', 'COLOR', 'IMAGE', 'ICON'])
  valueType: 'TEXT' | 'COLOR' | 'IMAGE' | 'ICON';

  @Expose()
  @IsNumber()
  @IsOptional()
  sortOrder?: number;

  @Expose()
  @IsString()
  @IsOptional()
  textValue?: string | null;

  @Expose()
  @IsString()
  @IsOptional()
  colorValue?: string | null;

  @Expose()
  @IsUUID()
  @IsOptional()
  fileUuid?: string | null;

  @Expose()
  @IsString()
  @IsOptional()
  iconCode?: string | null;
}
