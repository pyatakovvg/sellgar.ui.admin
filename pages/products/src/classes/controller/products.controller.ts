import { ProductServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { ProductsStoreInterface } from '../store/products-store.interface.ts';
import { ProductsControllerInterface } from './products-controller.interface.ts';

@injectable()
export class ProductsController implements ProductsControllerInterface {
  constructor(
    @inject(ProductsStoreInterface) readonly productStore: ProductsStoreInterface,
    @inject(ProductServiceInterface) private readonly productService: ProductServiceInterface,
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
