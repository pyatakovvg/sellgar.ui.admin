import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { PropertyGroupEntity, PropertyGroupResultEntity } from '../property-group.entity.ts';

import { CreatePropertyGroupDto } from './dto/create-property-group.dto.ts';
import { UpdatePropertyGroupDto } from './dto/update-property-group.dto.ts';

import { PropertyGroupGatewayInterface } from '../gateway/property-group-gateway.interface.ts';

import { type PropertyGroupServiceInterface } from './property-group-service.interface.ts';

@injectable()
export class PropertyGroupService implements PropertyGroupServiceInterface {
  constructor(
    @inject(PropertyGroupGatewayInterface) private readonly propertyGroupGateway: PropertyGroupGatewayInterface,
  ) {}

  async findAll(): Promise<PropertyGroupResultEntity> {
    const result = await this.propertyGroupGateway.findAll();
    const resultInstance = plainToInstance(PropertyGroupResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async findByUuid(uuid: string): Promise<PropertyGroupEntity> {
    const result = await this.propertyGroupGateway.findByUuid(uuid);
    const resultInstance = plainToInstance(PropertyGroupEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async update(uuid: string, updatePropertyGroupDto: UpdatePropertyGroupDto): Promise<PropertyGroupEntity> {
    const result = await this.propertyGroupGateway.update(uuid, updatePropertyGroupDto);
    const resultInstance = plainToInstance(PropertyGroupEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async create(createPropertyGroupDto: CreatePropertyGroupDto): Promise<PropertyGroupEntity> {
    const result = await this.propertyGroupGateway.create(createPropertyGroupDto);
    const resultInstance = plainToInstance(PropertyGroupEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
