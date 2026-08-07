import { Expose, Type } from 'class-transformer';
import { IsArray, IsDateString, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { UnitEntity } from '../../unit';

import { PropertyOptionEntity } from './property-option.entity.ts';

export class PropertyEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsNumber()
  version: number;

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
  @IsString()
  description: string;

  @Expose()
  @IsString()
  type: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'OPTION' | 'DATE';

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => UnitEntity)
  unit?: UnitEntity | null;

  @IsArray()
  @Expose()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PropertyOptionEntity)
  options?: PropertyOptionEntity[];

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
