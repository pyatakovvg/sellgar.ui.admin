import { PropertyGroupEntity } from '@library/domain';

import { CreatePropertyGroupDto } from './dto/create-property-group.dto.ts';
import { UpdatePropertyGroupDto } from './dto/update-property-group.dto.ts';

export abstract class PropertyGroupModifyControllerInterface {
  abstract findByUuid(uuid?: string): Promise<PropertyGroupEntity>;

  abstract create(data: CreatePropertyGroupDto): Promise<PropertyGroupEntity>;
  abstract update(uuid: string, data: UpdatePropertyGroupDto): Promise<PropertyGroupEntity>;
}
