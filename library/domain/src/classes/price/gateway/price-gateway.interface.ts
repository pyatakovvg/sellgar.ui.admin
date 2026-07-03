import { CreatePriceDto } from './dto/create-price.dto.ts';

import { PriceEntity, PriceResultEntity } from '../domain/price.entity.ts';

export abstract class PriceGatewayInterface {
  abstract findAll(storeUuid: string): Promise<PriceResultEntity>;
  abstract create(storeUuid: string, dto: CreatePriceDto): Promise<PriceEntity>;
}
