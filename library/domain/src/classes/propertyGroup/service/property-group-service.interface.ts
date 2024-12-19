import { CreatePropertyGroupDto } from './dto/create-property-group.dto.ts';
import { UpdatePropertyGroupDto } from './dto/update-property-group.dto.ts';

import { PropertyGroupEntity, PropertyGroupResultEntity } from '../property-group.entity.ts';

export abstract class PropertyGroupServiceInterface {
  abstract findAll(): Promise<PropertyGroupResultEntity>;
  abstract findByUuid(code: string): Promise<PropertyGroupEntity>;
  abstract create(createBrandDto: CreatePropertyGroupDto): Promise<PropertyGroupEntity>;
  abstract update(code: string, updateBrandDto: UpdatePropertyGroupDto): Promise<PropertyGroupEntity>;
}
