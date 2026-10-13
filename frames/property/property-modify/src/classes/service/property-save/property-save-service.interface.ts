import type { PropertyEntity } from '@library/domain';
import type { PropertySaveInput } from './input/property-save.input.ts';

export abstract class PropertySaveServiceInterface {
  abstract create(input: PropertySaveInput): Promise<PropertyEntity>;
  abstract update(code: string, input: PropertySaveInput): Promise<PropertyEntity>;
}
