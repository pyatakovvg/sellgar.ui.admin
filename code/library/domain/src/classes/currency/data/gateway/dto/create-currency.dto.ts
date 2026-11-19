import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import type { CreateCurrencyInput } from '../input/create-currency.input.ts';

export class CreateCurrencyDto implements CreateCurrencyInput {
  @Expose()
  @IsString()
  code: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;
}
