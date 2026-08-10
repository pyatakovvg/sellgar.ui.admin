import { ProductServiceInterface } from '@library/domain';

import { Controller, Inject, NavigateServiceInterface } from '@sellgar/app';

import { ProductControllerInterface } from './product-controller.interface.ts';

@Controller()
export class ProductController implements ProductControllerInterface {
  constructor(
    @Inject(ProductServiceInterface) private readonly productService: ProductServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
  ) {}

  loader() {
    return this.productService.findAll();
  }

  create(): Promise<void> {
    return this.navigateService.to('/products/create');
  }

  open(uuid: string): Promise<void> {
    return this.navigateService.to('/products/' + uuid);
  }
}
