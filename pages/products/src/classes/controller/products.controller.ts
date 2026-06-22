import { ProductServiceInterface, logger } from '@library/domain';

import { Controller, Inject } from '@tiyn/app';

import { ProductsControllerInterface } from './products-controller.interface.ts';

@Controller()
export class ProductsController implements ProductsControllerInterface {
  constructor(@Inject(ProductServiceInterface) private readonly productService: ProductServiceInterface) {}

  @logger()
  async loader() {
    return await this.productService.findAll();
  }
}
