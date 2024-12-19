import { CreatePropertyDto } from './dto/create-property.dto.ts';
import { UpdatePropertyDto } from './dto/update-property.dto.ts';

export abstract class PropertyGatewayInterface {
  abstract findAll(): Promise<any>;
  abstract findByUuid(uuid: string): Promise<any>;
  abstract create(createPropertyDto: CreatePropertyDto): Promise<any>;
  abstract update(uuid: string, updatePropertyDto: UpdatePropertyDto): Promise<any>;
}
