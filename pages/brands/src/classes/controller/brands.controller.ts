import { BrandServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { BrandStore, BrandStoreSymbol } from '../store/brand.store.ts';

export const BrandsControllerSymbol = Symbol.for('BrandsController');

@injectable()
export class BrandsController {
  constructor(
    @inject(BrandStoreSymbol) private readonly brandStore: BrandStore,
    @inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface,
  ) {}

  getData() {
    return this.brandStore.data;
  }

  getMeta() {
    return this.brandStore.meta;
  }

  async findAll() {
    const result = await this.brandService.findAll();

    this.brandStore.setData(result.data);
    this.brandStore.setMeta(result.meta);

    return result.data;
  }
}
