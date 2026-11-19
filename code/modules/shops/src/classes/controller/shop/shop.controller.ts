import { ShopServiceInterface } from '@library/domain';
import { Controller, Inject, RouteQueryServiceInterface } from '@sellgar/app';

import { FilterQuery } from './query/filter.query.ts';

import { ShopControllerInterface } from './shop-controller.interface.ts';

@Controller()
export class ShopController implements ShopControllerInterface {
  constructor(
    @Inject(ShopServiceInterface)
    private readonly shopService: ShopServiceInterface,
    @Inject(RouteQueryServiceInterface)
    private readonly query: RouteQueryServiceInterface,
  ) {}

  loader() {
    const filter = this.query.get(FilterQuery);

    return this.shopService.findAll(filter);
  }
}
