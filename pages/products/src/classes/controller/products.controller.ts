import { ProductServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { ProductsControllerInterface } from './products-controller.interface.ts';

@injectable()
export class ProductsController implements ProductsControllerInterface {
  constructor(@inject(ProductServiceInterface) private readonly productService: ProductServiceInterface) {}

  async loader() {
    return await this.productService.findAll();
  }
}
