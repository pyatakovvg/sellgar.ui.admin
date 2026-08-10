import type { ControllerInterface } from '@sellgar/app';

import type { FilterInput } from './input/filter.input.ts';

export abstract class FilterControllerInterface implements ControllerInterface {
  abstract loader(): FilterInput;
  abstract apply(input: FilterInput): Promise<void>;
}
