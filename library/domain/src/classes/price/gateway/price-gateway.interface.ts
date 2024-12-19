import { CreatePriceDto } from './dto/create-price.dto.ts';

import { PriceEntity, PriceResultEntity } from '../price.entity.ts';

export abstract class PriceGatewayInterface {
  abstract findAll(productUuid: string): Promise<PriceResultEntity>;
  abstract create(productUuid: string, dto: CreatePriceDto): Promise<PriceEntity>;
}
