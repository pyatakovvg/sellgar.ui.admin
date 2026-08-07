import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { MetaEntity } from '../../meta/index.ts';

import { UnitEntity } from './unit.entity.ts';

export class UnitResultEntity {
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UnitEntity)
  data: UnitEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
