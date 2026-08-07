import { CreatePropertyInput } from '../data/gateway/input/create-property.input.ts';
import { UpdatePropertyInput } from '../data/gateway/input/update-property.input.ts';

import { PropertyEntity } from '../domain/property.entity.ts';
import { PropertyResultEntity } from '../domain/property-result.entity.ts';

export abstract class PropertyServiceInterface {
  abstract findAll(): Promise<PropertyResultEntity>;
  abstract findByUuid(uuid: string): Promise<PropertyEntity>;
  abstract create(input: CreatePropertyInput): Promise<PropertyEntity>;
  abstract update(uuid: string, input: UpdatePropertyInput): Promise<PropertyEntity>;
}
