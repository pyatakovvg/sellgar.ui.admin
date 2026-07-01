import { ProductEntity, ProductServiceInterface } from '@library/domain';
import { Controller, Inject, type FrameControllerLoaderArgs } from '@tiyn/app';

import { ProductListControllerInterface } from './product-list-controller.interface.ts';
import { StoreModifyFrameParams } from '../params';

@Controller()
export class ProductListController implements ProductListControllerInterface {
  constructor(@Inject(ProductServiceInterface) private readonly productService: ProductServiceInterface) {}

  async loader(_args: FrameControllerLoaderArgs<StoreModifyFrameParams>): Promise<ProductEntity[]> {
    const result = await this.productService.findAll();

    return result.data;
  }
}
