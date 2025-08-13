import { Type } from 'class-transformer';
import { IsUUID, IsOptional, IsString, ValidateNested, IsDateString } from 'class-validator';

import { UnitEntity } from '../unit';
import { MetaEntity } from '../../meta.entity.ts';

export class PropertyEntity {
  @IsUUID()
  uuid: string;

  @IsUUID()
  @IsOptional()
  groupUuid?: string;

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

  @IsOptional()
  @ValidateNested()
  @Type(() => UnitEntity)
  unit?: UnitEntity | null;

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
