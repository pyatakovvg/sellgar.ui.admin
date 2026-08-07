import { Expose, Type } from 'class-transformer';
import { IsDateString, IsNumber, IsUUID, ValidateNested } from 'class-validator';

import { CurrencyEntity } from '../../currency/index.ts';

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
