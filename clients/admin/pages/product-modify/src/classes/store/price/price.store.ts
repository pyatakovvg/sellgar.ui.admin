import { PriceEntity, PriceServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { observable, action, makeObservable } from 'mobx';

import { PriceStoreInterface } from './price-store.interface.ts';

import { CreatePriceDto } from './dto/create-price.dto.ts';

@injectable()
export class PriceStore implements PriceStoreInterface {
  @observable inProcess: boolean = false;
  @observable data: PriceEntity[] = [];

  constructor(@inject(PriceServiceInterface) private readonly priceService: PriceServiceInterface) {
    makeObservable(this);
  }

  @action.bound
  setData(data: PriceEntity[]) {
    this.data = data;
  }

  @action.bound
  setProcess(state: boolean) {
    this.inProcess = state;
  }

  async findAll(productUuid: string) {
    const result = await this.priceService.findAll(productUuid);

    this.setData(result.data);
  }

  async create(productUuid: string, dto: CreatePriceDto) {
    this.setProcess(true);

    try {
      await this.priceService.create(productUuid, dto);
    } finally {
      this.setProcess(false);
    }
  }
}
