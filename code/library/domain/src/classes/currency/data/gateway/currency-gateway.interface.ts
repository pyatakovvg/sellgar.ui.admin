import { CreateCurrencyInput } from './input/create-currency.input.ts';
import { UpdateCurrencyInput } from './input/update-currency.input.ts';

import { CurrencyEntity } from '../../domain/currency.entity.ts';
import { CurrencyResultEntity } from '../../domain/currency-result.entity.ts';

export abstract class CurrencyGatewayInterface {
  abstract findAll(): Promise<CurrencyResultEntity>;
  abstract findByUuid(code: string): Promise<CurrencyEntity>;
  abstract remove(code: string): Promise<CurrencyEntity>;
  abstract create(input: CreateCurrencyInput): Promise<CurrencyEntity>;
  abstract update(code: string, input: UpdateCurrencyInput): Promise<CurrencyEntity>;
}
