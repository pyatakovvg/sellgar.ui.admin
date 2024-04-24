import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional, ValidateNested, IsObject } from 'class-validator';

import { CurrencyEntity } from './currency.entity.ts';

export class PriceEntity {
  @IsNumber()
  price: number;

  @IsNumber()
  @IsOptional()
  prevPrice: number | null;

  @IsString()
  description: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CurrencyEntity)
  currency: CurrencyEntity;
}
