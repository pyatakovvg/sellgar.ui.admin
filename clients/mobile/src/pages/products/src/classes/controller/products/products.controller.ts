import { Controller, Inject, RouteQueryServiceInterface } from '@sellgar/app-v2';

import { delay } from '../../../../../../shared/runtime/delay';
import { ProductsFilterQuery } from '../../query/products-filter.query.ts';
import { ProductsControllerInterface, type ProductsLoaderData } from './products-controller.interface.ts';

@Controller()
export class ProductsController extends ProductsControllerInterface {
  private static nextInstance = 0;

  private readonly instance = ++ProductsController.nextInstance;
  private loads = 0;

  constructor(
    @Inject(RouteQueryServiceInterface)
    private readonly query: RouteQueryServiceInterface,
  ) {
    super();
  }

  async loader({ signal }: Parameters<ProductsControllerInterface['loader']>[0]): Promise<ProductsLoaderData> {
    const startedAt = Date.now();
    await delay(1200, signal);

    return Object.freeze({
      duration: Date.now() - startedAt,
      instance: this.instance,
      loads: ++this.loads,
      search: this.query.get(ProductsFilterQuery).search,
    });
  }
}
