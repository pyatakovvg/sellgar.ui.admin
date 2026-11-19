import { Expose, Type } from 'class-transformer';
import { IsArray, IsInt, ValidateNested } from 'class-validator';
import { EntityCollection } from '@sellgar/app';

import { UnitEntity } from './unit.entity.ts';

@EntityCollection({ entity: UnitEntity, property: 'items' })
export class UnitResultEntity {
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UnitEntity)
  items: UnitEntity[];

  @Expose()
  @IsInt()
  total: number;

  @Expose()
  @IsInt()
  limit: number;

  @Expose()
  @IsInt()
  offset: number;
}
