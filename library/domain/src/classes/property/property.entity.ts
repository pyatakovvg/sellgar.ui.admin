import { Type } from 'class-transformer';
import { IsUUID, IsOptional, IsString, ValidateNested, IsDateString } from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';
import { UnitEntity } from '../unit/unit.entity.ts';

export class PropertyEntity {
  @IsUUID()
  uuid: string;

  @IsUUID()
  groupUuid: string;

  @IsUUID()
  @IsOptional()
  unitUuid: string | null;

  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  type: 'TEXT' | 'CHECKBOX' | 'RADIO' | 'DATE' | 'RANGE';

  @ValidateNested()
  @Type(() => UnitEntity)
  unit: UnitEntity | null;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}

export class PropertyResultEntity {
  @ValidateNested()
  @Type(() => PropertyEntity)
  data: PropertyEntity[];

  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
