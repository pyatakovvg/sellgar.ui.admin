import { Type } from 'class-transformer';
import { IsUUID, IsString, ValidateNested, IsDateString, IsNumber } from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';

import { PropertyEntity } from '../property';

export class PropertyGroupEntity {
  @IsUUID()
  uuid: string;

  @IsNumber()
  version: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @ValidateNested()
  @Type(() => PropertyEntity)
  properties: PropertyEntity[];

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}

export class PropertyGroupResultEntity {
  @ValidateNested()
  @Type(() => PropertyGroupEntity)
  data: PropertyGroupEntity[];

  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
