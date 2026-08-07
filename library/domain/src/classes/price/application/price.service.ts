import { Inject, Injectable } from '@sellgar/app';

import { PriceServiceInterface } from './price-service.interface.ts';
import { PriceGatewayInterface } from '../data/gateway/price-gateway.interface.ts';
import { CreatePriceInput } from '../data/gateway/input/create-price.input.ts';
import { PriceEntity } from '../domain/price.entity.ts';
import { PriceResultEntity } from '../domain/price-result.entity.ts';

@Injectable()
export class PriceService implements PriceServiceInterface {
  constructor(@Inject(PriceGatewayInterface) private readonly priceGateway: PriceGatewayInterface) {}

  findAll(storeUuid: string): Promise<PriceResultEntity> {
    return this.priceGateway.findAll(storeUuid);
  }

  create(storeUuid: string, input: CreatePriceInput): Promise<PriceEntity> {
    return this.priceGateway.create(storeUuid, input);
  }
}
