import { CreatePropertyInput } from '../data/gateway/input/create-property.input.ts';
import { UpdatePropertyInput } from '../data/gateway/input/update-property.input.ts';
import { PropertyOptionInput } from '../data/gateway/input/property-option.input.ts';
import { UpdatePropertyOptionInput } from '../data/gateway/input/update-property-option.input.ts';

import { PropertyEntity } from '../domain/property.entity.ts';
import { PropertyResultEntity } from '../domain/property-result.entity.ts';

export abstract class PropertyServiceInterface {
  abstract findAll(): Promise<PropertyResultEntity>;
  abstract findByCode(code: string): Promise<PropertyEntity>;
  abstract create(input: CreatePropertyInput): Promise<PropertyEntity>;
  abstract update(code: string, input: UpdatePropertyInput): Promise<PropertyEntity>;
  abstract createOption(code: string, version: number, option: PropertyOptionInput): Promise<PropertyEntity>;
  abstract updateOption(code: string, optionCode: string, input: UpdatePropertyOptionInput): Promise<PropertyEntity>;
}
