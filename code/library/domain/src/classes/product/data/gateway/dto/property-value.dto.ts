import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

import type { PropertyValueInput } from '../input/product-property.input.ts';

export class PropertyValueDto implements PropertyValueInput {
  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(65535)
  valueText?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @Matches(/^-?\d+$/)
  valueInteger?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @Matches(/^-?(?:0|[1-9]\d*)(?:\.\d+)?$/)
  valueDecimal?: string;

  @Expose()
  @IsOptional()
  @IsBoolean()
  valueBoolean?: boolean;

  @Expose()
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  valueDate?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(256)
  valueOptionCode?: string;
}
