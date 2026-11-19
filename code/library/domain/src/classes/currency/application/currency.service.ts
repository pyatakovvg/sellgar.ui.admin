import { Inject, Injectable } from '@sellgar/app';

import { CurrencyServiceInterface } from './currency-service.interface.ts';
import { CurrencyGatewayInterface } from '../data/gateway/currency-gateway.interface.ts';
import { CreateCurrencyInput } from '../data/gateway/input/create-currency.input.ts';
import { UpdateCurrencyInput } from '../data/gateway/input/update-currency.input.ts';
import { CurrencyEntity } from '../domain/currency.entity.ts';
import { CurrencyResultEntity } from '../domain/currency-result.entity.ts';

@Injectable()
export class CurrencyService implements CurrencyServiceInterface {
  constructor(@Inject(CurrencyGatewayInterface) private readonly currencyGateway: CurrencyGatewayInterface) {}

  findAll(): Promise<CurrencyResultEntity> {
    return this.currencyGateway.findAll();
  }

  findByUuid(code: string): Promise<CurrencyEntity> {
    return this.currencyGateway.findByUuid(code);
  }

  update(code: string, input: UpdateCurrencyInput): Promise<CurrencyEntity> {
    return this.currencyGateway.update(code, input);
  }

  create(input: CreateCurrencyInput): Promise<CurrencyEntity> {
    return this.currencyGateway.create(input);
  }
}
