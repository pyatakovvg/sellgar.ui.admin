import { Inject, Injectable } from '@sellgar/app';

import { PropertyServiceInterface } from './property-service.interface.ts';
import { PropertyGatewayInterface } from '../data/gateway/property-gateway.interface.ts';
import { CreatePropertyInput } from '../data/gateway/input/create-property.input.ts';
import { UpdatePropertyInput } from '../data/gateway/input/update-property.input.ts';
import { PropertyEntity } from '../domain/property.entity.ts';
import { PropertyResultEntity } from '../domain/property-result.entity.ts';

@Injectable()
export class PropertyService implements PropertyServiceInterface {
  constructor(@Inject(PropertyGatewayInterface) private readonly propertyGateway: PropertyGatewayInterface) {}

  findAll(): Promise<PropertyResultEntity> {
    return this.propertyGateway.findAll();
  }

  findByUuid(uuid: string): Promise<PropertyEntity> {
    return this.propertyGateway.findByUuid(uuid);
  }

  update(uuid: string, input: UpdatePropertyInput): Promise<PropertyEntity> {
    return this.propertyGateway.update(uuid, input);
  }

  create(input: CreatePropertyInput): Promise<PropertyEntity> {
    return this.propertyGateway.create(input);
  }
}
