import { CreatePropertyDto } from './dto/create-property.dto.ts';
import { UpdatePropertyDto } from './dto/update-property.dto.ts';

import { PropertyEntity, PropertyResultEntity } from '../property.entity.ts';

export abstract class PropertyServiceInterface {
  abstract findAll(): Promise<PropertyResultEntity>;
  abstract findByUuid(uuid: string): Promise<PropertyEntity>;
  abstract create(createPropertyDto: CreatePropertyDto): Promise<PropertyEntity>;
  abstract update(uuid: string, updatePropertyDto: UpdatePropertyDto): Promise<PropertyEntity>;
}
