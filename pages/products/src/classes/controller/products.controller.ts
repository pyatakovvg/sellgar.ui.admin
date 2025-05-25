import { ProductVariantServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { ProductsStoreInterface } from '../store/products-store.interface.ts';
import { ProductsControllerInterface } from './products-controller.interface.ts';

@injectable()
export class ProductsController implements ProductsControllerInterface {
  constructor(
    @inject(ProductsStoreInterface) readonly productStore: ProductsStoreInterface,
    @inject(ProductVariantServiceInterface) private readonly productService: ProductVariantServiceInterface,
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
