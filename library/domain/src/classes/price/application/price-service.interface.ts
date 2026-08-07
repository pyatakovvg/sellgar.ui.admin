import { CreatePriceInput } from '../data/gateway/input/create-price.input.ts';

import { PriceEntity } from '../domain/price.entity.ts';
import { PriceResultEntity } from '../domain/price-result.entity.ts';

export abstract class PriceServiceInterface {
  abstract findAll(storeUuid: string): Promise<PriceResultEntity>;
  abstract create(storeUuid: string, input: CreatePriceInput): Promise<PriceEntity>;
}
