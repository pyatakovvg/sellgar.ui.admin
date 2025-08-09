import { CreateCurrencyDto } from './dto/create-currency.dto.ts';
import { UpdateCurrencyDto } from './dto/update-currency.dto.ts';

import { CurrencyEntity, CurrencyResultEntity } from '../currency.entity.ts';

export abstract class CurrencyGatewayInterface {
  abstract findAll(): Promise<CurrencyResultEntity>;
  abstract findByUuid(code: string): Promise<CurrencyEntity>;
  abstract remove(code: string): Promise<CurrencyEntity>;
  abstract create(dto: CreateCurrencyDto): Promise<CurrencyEntity>;
  abstract update(code: string, dto: UpdateCurrencyDto): Promise<CurrencyEntity>;
}
