import { CreatePriceDto } from './dto/create-brand.dto.ts';

import { PriceEntity, PriceResultEntity } from '../price.entity.ts';

export abstract class PriceServiceInterface {
  abstract findAll(productUuid: string): Promise<PriceResultEntity>;
  abstract create(productUuid: string, dto: CreatePriceDto): Promise<PriceEntity>;
}
