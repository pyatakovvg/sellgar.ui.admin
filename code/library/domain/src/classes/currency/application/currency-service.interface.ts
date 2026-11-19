import { CreateCurrencyInput } from '../data/gateway/input/create-currency.input.ts';
import { UpdateCurrencyInput } from '../data/gateway/input/update-currency.input.ts';

import { CurrencyEntity } from '../domain/currency.entity.ts';
import { CurrencyResultEntity } from '../domain/currency-result.entity.ts';

export abstract class CurrencyServiceInterface {
  abstract findAll(): Promise<CurrencyResultEntity>;
  abstract findByUuid(code: string): Promise<CurrencyEntity>;
  abstract create(input: CreateCurrencyInput): Promise<CurrencyEntity>;
  abstract update(code: string, input: UpdateCurrencyInput): Promise<CurrencyEntity>;
}
