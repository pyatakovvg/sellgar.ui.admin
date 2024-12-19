import { CreatePropertyGroupDto } from './dto/create-property-group.dto.ts';
import { UpdatePropertyGroupDto } from './dto/update-property-group.dto.ts';

export abstract class PropertyGroupGatewayInterface {
  abstract findAll(): Promise<any>;
  abstract findByUuid(uuid: string): Promise<any>;
  abstract create(createPropertyGroupDto: CreatePropertyGroupDto): Promise<any>;
  abstract update(uuid: string, updatePropertyGroupDto: UpdatePropertyGroupDto): Promise<any>;
}
