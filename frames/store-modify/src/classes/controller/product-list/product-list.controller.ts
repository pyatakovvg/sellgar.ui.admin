import { ProductServiceInterface, type ProductEntity } from '@library/domain';
import { Controller, Inject } from '@sellgar/app';

import { ProductListControllerInterface } from './product-list-controller.interface.ts';
@Controller()
export class ProductListController implements ProductListControllerInterface {
  constructor(@Inject(ProductServiceInterface) private readonly productService: ProductServiceInterface) {}

  async loader(): Promise<ProductEntity[]> {
    const result = await this.productService.findAll();

    return result.data;
  }
}
