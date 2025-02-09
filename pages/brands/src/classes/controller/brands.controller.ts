import { inject, injectable } from 'inversify';

import { BrandStore, BrandStoreSymbol } from '../store/brand.store.ts';

export const BrandsControllerSymbol = Symbol.for('BrandsController');

@injectable()
export class BrandsController {
  constructor(@inject(BrandStoreSymbol) private readonly brandStore: BrandStore) {}

  getData() {
    return this.brandStore.data;
  }

  getMeta() {
    return this.brandStore.meta;
  }

  getInProcess() {
    return this.brandStore.inProcess;
  }

  async findAll() {
    return await this.brandStore.findAll();
  }
}
