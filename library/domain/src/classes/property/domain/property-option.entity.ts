import { Expose, Type } from 'class-transformer';
import { IsArray, IsDateString, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { PropertyOptionMetadataEntity } from './property-option-metadata.entity.ts';

export class PropertyOptionEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsNumber()
  version: number;

  @Expose()
  @IsUUID()
  propertyUuid: string;

  @Expose()
  @IsString()
  code: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsNumber()
  sortOrder: number;

  @IsArray()
  @Expose()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PropertyOptionMetadataEntity)
  metadata?: PropertyOptionMetadataEntity[];

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
