import { Controller, Inject, LocationServiceInterface, NavigateServiceInterface } from '@sellgar/app';

import { FilterDto } from './dto/filter.dto.ts';
import { FilterControllerInterface } from './filter-controller.interface.ts';
import type { FilterInput } from './input/filter.input.ts';
import { FilterMapper } from './mapper/filter.mapper.ts';

@Controller()
export class FilterController implements FilterControllerInterface {
  constructor(
    @Inject(LocationServiceInterface) private readonly locationService: LocationServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
  ) {}

  loader(): FilterInput {
    return FilterMapper.fromDto(this.locationService.searchToObject(FilterDto));
  }

  apply(input: FilterInput): Promise<void> {
    return this.navigateService.searchParams(FilterMapper.toSearchParams(input), { merge: true });
  }
}
