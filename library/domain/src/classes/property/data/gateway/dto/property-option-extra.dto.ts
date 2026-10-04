import { Expose } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, IsUUID, Matches, Max, Min } from 'class-validator';

import type { PropertyOptionExtraInput } from '../input/property-option-extra.input.ts';

export class PropertyOptionExtraDto implements PropertyOptionExtraInput {
  @Expose()
  @IsIn(['TEXT', 'COLOR', 'IMAGE'])
  type: 'TEXT' | 'COLOR' | 'IMAGE';

  @Expose()
  @IsInt()
  @Min(0)
  @Max(2147483647)
  @IsOptional()
  sortOrder?: number;

  @Expose()
  @IsIn(['TEXT', 'ICON'])
  @IsOptional()
  textDisplay?: 'TEXT' | 'ICON';

  @Expose()
  @IsString()
  @IsOptional()
  valueText?: string;

  @Expose()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}(?:[0-9A-Fa-f]{2})?$/)
  @IsOptional()
  valueColor?: string;

  @Expose()
  @IsUUID()
  @IsOptional()
  imageUuid?: string;
}
