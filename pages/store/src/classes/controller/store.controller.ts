import { StoreServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { ProductsStoreInterface } from '../store/products-store.interface.ts';
import { StoreControllerInterface } from './store-controller.interface.ts';

@injectable()
export class StoreController implements StoreControllerInterface {
  constructor(
    @inject(ProductsStoreInterface) readonly productStore: ProductsStoreInterface,
    @inject(StoreServiceInterface) private readonly productService: StoreServiceInterface,
  ) {}

  async findAll() {
    this.productStore.setProcess(true);

    try {
      const result = await this.productService.findAll();

      this.productStore.setData(result.data);
      this.productStore.setMeta(result.meta);
    } finally {
      this.productStore.setProcess(false);
    }
  }
}
