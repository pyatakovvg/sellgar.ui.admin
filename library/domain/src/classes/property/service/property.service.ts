import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { PropertyEntity, PropertyResultEntity } from '..//property.entity.ts';

import { CreatePropertyDto } from './dto/create-property.dto.ts';
import { UpdatePropertyDto } from './dto/update-property.dto.ts';

import { PropertyServiceInterface } from './property-service.interface.ts';
import { PropertyGatewayInterface } from '../gateway/property-gateway.interface.ts';

@injectable()
export class PropertyService implements PropertyServiceInterface {
  constructor(@inject(PropertyGatewayInterface) private readonly propertyGateway: PropertyGatewayInterface) {}

  async findAll(): Promise<PropertyResultEntity> {
    const result = await this.propertyGateway.findAll();
    const resultInstance = plainToInstance(PropertyResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async findByUuid(uuid: string): Promise<PropertyEntity> {
    const result = await this.propertyGateway.findByUuid(uuid);
    const resultInstance = plainToInstance(PropertyEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async update(uuid: string, updatePropertyDto: UpdatePropertyDto): Promise<PropertyEntity> {
    const result = await this.propertyGateway.update(uuid, updatePropertyDto);
    const resultInstance = plainToInstance(PropertyEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async create(createPropertyDto: CreatePropertyDto): Promise<PropertyEntity> {
    const result = await this.propertyGateway.create(createPropertyDto);
    const resultInstance = plainToInstance(PropertyEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
