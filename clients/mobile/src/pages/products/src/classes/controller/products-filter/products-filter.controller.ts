import { Controller, Inject, RouteQueryServiceInterface } from '@sellgar/app-v2';

import { ProductsFilterQuery } from '../../query/products-filter.query.ts';
import { ProductsFilterControllerInterface } from './products-filter-controller.interface.ts';

@Controller()
export class ProductsFilterController extends ProductsFilterControllerInterface {
  constructor(
    @Inject(RouteQueryServiceInterface)
    private readonly query: RouteQueryServiceInterface,
  ) {
    super();
  }

  action({ payload }: Parameters<ProductsFilterControllerInterface['action']>[0]): Promise<void> {
    return this.query.set(ProductsFilterQuery, payload);
  }

  loader(): ReturnType<ProductsFilterControllerInterface['loader']> {
    return this.query.get(ProductsFilterQuery);
  }
}
