import { Expose, Type } from 'class-transformer';
import { IsArray, IsDateString, IsEnum, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';

import { PropertyOptionEntity } from './property-option.entity.ts';
import { PropertyKind } from './property-kind.enum.ts';

export class PropertyEntity {
  @Expose()
  @IsString()
  code: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  description: string | null;

  @Expose()
  @IsEnum(PropertyKind)
  kind: PropertyKind;

  @Expose()
  @IsOptional()
  @IsString()
  unitCode: string | null;

  @Expose()
  @IsInt()
  version: number;

  @IsArray()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => PropertyOptionEntity)
  options: PropertyOptionEntity[];

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
