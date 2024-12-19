import { Type, Expose } from 'class-transformer';
import { IsUUID, IsNumber, ValidateNested, IsDateString } from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';
import { CurrencyEntity } from '../currency/currency.entity.ts';

export class PriceEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsNumber()
  value: number;

  @Expose()
  @ValidateNested()
  @Type(() => CurrencyEntity)
  currency: CurrencyEntity;

  @Expose()
  @IsDateString()
  createdAt: string;
}

export class PriceResultEntity {
  @ValidateNested()
  @Type(() => PriceEntity)
  data: PriceEntity[];

  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
