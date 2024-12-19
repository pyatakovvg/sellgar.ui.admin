import { PriceEntity } from '@library/domain';

import { CreatePriceDto } from './dto/create-price.dto.ts';

export abstract class PriceStoreInterface {
  abstract inProcess: boolean;
  abstract data: PriceEntity[];

  abstract setData(data: PriceEntity[]): void;
  abstract setProcess(state: boolean): void;

  abstract findAll(productUuid: string): Promise<void>;
  abstract create(productUuid: string, dto: CreatePriceDto): Promise<void>;
}
