import type { ControllerArgs, QueryInput, QueryValue, WithPayload } from '@sellgar/app-v2';

import type { ProductsFilterQuery } from '../../query/products-filter.query.ts';

export abstract class ProductsFilterControllerInterface {
  abstract action(args: ControllerArgs<WithPayload<QueryInput<ProductsFilterQuery>>>): Promise<void>;

  abstract loader(): QueryValue<ProductsFilterQuery>;
}
