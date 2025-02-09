import { inject, injectable } from 'inversify';

import { ProductsStore, ProductsStoreSymbol } from '../store/products.store.ts';

export const ProductsControllerSymbol = Symbol.for('ProductsController');

@injectable()
export class ProductsController {
  constructor(@inject(ProductsStoreSymbol) private readonly protectedStore: ProductsStore) {}

  getData() {
    return this.protectedStore.data;
  }

  getMeta() {
    return this.protectedStore.meta;
  }

  getInProcess() {
    return this.protectedStore.inProcess;
  }

  async findAll() {
    return await this.protectedStore.findAll();
  }
}
