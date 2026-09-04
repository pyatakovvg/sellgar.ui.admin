import { Controller, Inject, RouteQueryServiceInterface } from '@sellgar/app';

import { FilterControllerInterface } from './filter-controller.interface.ts';
import { FilterQuery } from './query/filter.query.ts';

@Controller()
export class FilterController implements FilterControllerInterface {
  constructor(@Inject(RouteQueryServiceInterface) private readonly query: RouteQueryServiceInterface) {}

  loader() {
    return this.query.get(FilterQuery);
  }

  action({ payload }: Parameters<FilterControllerInterface['action']>[0]): Promise<void> {
    return this.query.set(FilterQuery, payload);
  }
}
