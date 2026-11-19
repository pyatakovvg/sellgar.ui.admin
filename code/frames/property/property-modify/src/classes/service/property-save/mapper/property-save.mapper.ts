import type {
  CreatePropertyInput,
  UpdatePropertyInput,
  PropertyOptionInput,
  UpdatePropertyOptionInput,
} from '@library/domain';
import type { PropertySaveInput } from '../input/property-save.input.ts';
import type { PropertySaveOptionInput } from '../input/property-save-option.input.ts';

export class PropertySaveMapper {
  static create(input: PropertySaveInput): CreatePropertyInput {
    return {
      code: input.code,
      name: input.name,
      description: input.description,
      kind: input.kind,
      unitCode: input.unitCode,
      options: input.options.map((option) => this.option(option)),
    };
  }

  static update(input: PropertySaveInput): UpdatePropertyInput {
    if (input.version === undefined) throw new Error('Не передана версия свойства.');
    return { version: input.version, name: input.name, description: input.description };
  }

  static option(input: PropertySaveOptionInput): PropertyOptionInput {
    return { code: input.code, name: input.name, sortOrder: input.sortOrder, extras: input.extras };
  }

  static updateOption(input: PropertySaveOptionInput, version: number): UpdatePropertyOptionInput {
    return { version, name: input.name, sortOrder: input.sortOrder, extras: input.extras };
  }
}
