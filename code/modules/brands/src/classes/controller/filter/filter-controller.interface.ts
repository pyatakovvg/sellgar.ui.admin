import type { ControllerArgs, QueryValue, WithPayload } from '@sellgar/app';

import type { FilterQuery } from './query/filter.query.ts';

export abstract class FilterControllerInterface {
  abstract loader(): QueryValue<FilterQuery>;
  abstract action(args: ControllerArgs<WithPayload<QueryValue<FilterQuery>>>): Promise<void>;
}
