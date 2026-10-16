import { ProductServiceInterface } from '@library/domain';
import { ProductCreateRoute, ProductModifyRoute } from '@library/route-tokens';

import { Controller, Inject, NavigateServiceInterface, RouteQueryServiceInterface } from '@sellgar/app';

import { ProductControllerInterface } from './product-controller.interface.ts';
import { FilterQuery } from './query/filter.query.ts';

@Controller()
export class ProductController implements ProductControllerInterface {
  constructor(
    @Inject(ProductServiceInterface) private readonly productService: ProductServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @Inject(RouteQueryServiceInterface) private readonly query: RouteQueryServiceInterface,
  ) {}

  loader() {
    return this.productService.findAll(this.query.get(FilterQuery));
  }

  create(): Promise<void> {
    return this.navigateService.to(ProductCreateRoute);
  }

  open(uuid: string): Promise<void> {
    return this.navigateService.to(ProductModifyRoute, { params: { uuid } });
  }
}
