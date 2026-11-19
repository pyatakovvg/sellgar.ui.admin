import { Expose } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

import { PropertyOptionExtraKind } from './property-option-extra-kind.enum.ts';
import { PropertyOptionTextDisplay } from './property-option-text-display.enum.ts';

export class PropertyOptionExtraEntity {
  @Expose()
  @IsEnum(PropertyOptionExtraKind)
  type: PropertyOptionExtraKind;

  @Expose()
  @IsInt()
  sortOrder: number;

  @Expose()
  @IsOptional()
  @IsEnum(PropertyOptionTextDisplay)
  textDisplay: PropertyOptionTextDisplay | null;

  @Expose()
  @IsOptional()
  @IsString()
  valueText: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  valueColor: string | null;

  @Expose()
  @IsOptional()
  @IsUUID()
  imageUuid: string | null;
}
