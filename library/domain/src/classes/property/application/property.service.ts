import { Inject, Injectable } from '@sellgar/app';

import { PropertyServiceInterface } from './property-service.interface.ts';
import { PropertyGatewayInterface } from '../data/gateway/property-gateway.interface.ts';
import { CreatePropertyInput } from '../data/gateway/input/create-property.input.ts';
import { UpdatePropertyInput } from '../data/gateway/input/update-property.input.ts';
import { PropertyOptionInput } from '../data/gateway/input/property-option.input.ts';
import { UpdatePropertyOptionInput } from '../data/gateway/input/update-property-option.input.ts';
import { PropertyEntity } from '../domain/property.entity.ts';
import { PropertyResultEntity } from '../domain/property-result.entity.ts';

@Injectable()
export class PropertyService implements PropertyServiceInterface {
  constructor(@Inject(PropertyGatewayInterface) private readonly propertyGateway: PropertyGatewayInterface) {}

  findAll(): Promise<PropertyResultEntity> {
    return this.propertyGateway.findAll();
  }

  findByCode(code: string): Promise<PropertyEntity> {
    return this.propertyGateway.findByCode(code);
  }

  update(code: string, input: UpdatePropertyInput): Promise<PropertyEntity> {
    return this.propertyGateway.update(code, input);
  }

  create(input: CreatePropertyInput): Promise<PropertyEntity> {
    return this.propertyGateway.create(input);
  }

  createOption(code: string, version: number, option: PropertyOptionInput): Promise<PropertyEntity> {
    return this.propertyGateway.createOption(code, version, option);
  }

  updateOption(code: string, optionCode: string, input: UpdatePropertyOptionInput): Promise<PropertyEntity> {
    return this.propertyGateway.updateOption(code, optionCode, input);
  }
}
