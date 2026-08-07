import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { MetaEntity } from '../../meta/index.ts';

import { CurrencyEntity } from './currency.entity.ts';

export class CurrencyResultEntity {
  @IsArray()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CurrencyEntity)
  data: CurrencyEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
