import type { RouterSearchObject } from '@sellgar/app';

import type { FilterDto } from '../dto/filter.dto.ts';
import type { FilterInput } from '../input/filter.input.ts';

export class FilterMapper {
  static fromDto(filter: FilterDto): FilterInput {
    return {
      search: filter.search ?? '',
    };
  }

  static toSearchParams(input: FilterInput): RouterSearchObject {
    const search = input.search.trim();

    return {
      search: search.length > 0 ? search : undefined,
    };
  }
}
