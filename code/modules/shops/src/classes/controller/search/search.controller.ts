import { Controller, ControllerArgs, Inject, RouteQueryServiceInterface, WithPayload } from '@sellgar/app';

import { SearchQuery } from './query/search.query.ts';

import { SearchControllerInterface } from './search-controller.interface.ts';

@Controller()
export class SearchController implements SearchControllerInterface {
  constructor(
    @Inject(RouteQueryServiceInterface)
    private readonly location: RouteQueryServiceInterface,
  ) {}

  loader() {
    return this.location.get(SearchQuery);
  }

  action(args: ControllerArgs<WithPayload<SearchQuery>>) {
    return this.location.set(SearchQuery, args.payload);
  }

  reset() {
    return this.location.set(SearchQuery, {});
  }
}
