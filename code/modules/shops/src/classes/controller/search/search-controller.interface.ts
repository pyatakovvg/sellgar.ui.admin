import { QueryValue, ControllerArgs, WithPayload } from '@sellgar/app';

import { SearchQuery } from './query/search.query.ts';

export abstract class SearchControllerInterface {
  abstract loader(): QueryValue<SearchQuery>;
  abstract action(args: ControllerArgs<WithPayload<SearchQuery>>): Promise<void>;
  abstract reset(): Promise<void>;
}
