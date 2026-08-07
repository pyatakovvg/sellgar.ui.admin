import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { MetaEntity } from '../../meta/index.ts';

import { PropertyEntity } from './property.entity.ts';

export class PropertyResultEntity {
  @IsArray()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => PropertyEntity)
  data: PropertyEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
