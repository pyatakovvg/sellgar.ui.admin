import { Controller, Inject, RouteQueryServiceInterface } from '@sellgar/app';
import type { ControllerArgs, WithPayload } from '@sellgar/app';

import { SearchQuery } from './query/search.query.ts';
import { SearchControllerInterface } from './search-controller.interface.ts';

@Controller()
export class SearchController implements SearchControllerInterface {
  constructor(@Inject(RouteQueryServiceInterface) private readonly query: RouteQueryServiceInterface) {}

  loader() {
    return this.query.get(SearchQuery);
  }

  action(args: ControllerArgs<WithPayload<SearchQuery>>) {
    return this.query.set(SearchQuery, args.payload);
  }

  reset() {
    return this.query.set(SearchQuery, {});
  }
}
