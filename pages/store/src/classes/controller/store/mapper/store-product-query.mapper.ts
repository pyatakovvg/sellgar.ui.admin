import type { StoreProductQueryInput } from '@library/domain';

import type { StoreProductQueryDto } from '../dto/store-product-query.dto.ts';

export class StoreProductQueryMapper {
  static toInput(query: StoreProductQueryDto): StoreProductQueryInput {
    return {
      search: query.search,
    };
  }
}
