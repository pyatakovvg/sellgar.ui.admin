import { PropertyEntity } from '@library/domain';

import { CreatePropertyDto } from './dto/create-property.dto.ts';
import { UpdatePropertyDto } from './dto/update-property.dto.ts';

import { FormStoreInterface } from '../store/form/form-store.interface.ts';

export abstract class PropertyModifyControllerInterface {
  abstract formStore: FormStoreInterface;

  abstract findByUuid(uuid?: string): Promise<PropertyEntity>;

  abstract create(data: CreatePropertyDto): Promise<PropertyEntity>;
  abstract update(uuid: string, data: UpdatePropertyDto): Promise<PropertyEntity>;
}
