import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import type { CreatePriceInput } from '../input/create-price.input.ts';

export class CreatePriceDto implements CreatePriceInput {
  @Expose()
  @IsNumber()
  value: number;

  @Expose()
  @IsString()
  currencyCode: string;
}
