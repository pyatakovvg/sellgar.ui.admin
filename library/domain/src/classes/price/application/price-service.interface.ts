import { CreatePriceDto } from './dto/create-brand.dto.ts';

import { PriceEntity, PriceResultEntity } from '../domain/price.entity.ts';

export abstract class PriceServiceInterface {
  abstract findAll(storeUuid: string): Promise<PriceResultEntity>;
  abstract create(storeUuid: string, dto: CreatePriceDto): Promise<PriceEntity>;
}
