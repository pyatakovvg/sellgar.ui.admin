import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { MetaEntity } from '../../meta/index.ts';

import { PriceEntity } from './price.entity.ts';

export class PriceResultEntity {
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PriceEntity)
  data: PriceEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
