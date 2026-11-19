import { Expose } from 'class-transformer';
import { IsString, Matches } from 'class-validator';
import type { StorePriceInput } from '../input/store-price.input.ts';

export class PriceDto implements StorePriceInput {
  @Expose()
  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/)
  value: string;

  @Expose()
  @IsString()
  currencyCode: string;
}
