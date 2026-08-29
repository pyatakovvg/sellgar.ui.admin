import { ProductServiceInterface } from '@library/domain';
import { ProductCreateRoute, ProductModifyRoute } from '@library/route-tokens';

import { Controller, Inject, NavigateServiceInterface } from '@sellgar/app-v2';

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
    return this.navigateService.to(ProductCreateRoute);
  }

  open(uuid: string): Promise<void> {
    return this.navigateService.to(ProductModifyRoute, { params: { uuid } });
  }
}
