import { Type } from 'class-transformer';
import { IsUUID, IsString, ValidateNested, IsDateString } from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';

export class UnitEntity {
  @IsUUID()
  uuid: string;

  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}

export class UnitResultEntity {
  @ValidateNested()
  @Type(() => UnitEntity)
  data: UnitEntity[];

  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
