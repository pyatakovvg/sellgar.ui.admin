import { PropertyEntity, PropertyGroupServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { CreatePropertyGroupDto } from './dto/create-property-group.dto.ts';
import { UpdatePropertyGroupDto } from './dto/update-property-group.dto.ts';

import { PropertyGroupModifyControllerInterface } from './property-group-modify-controller.interface.ts';

@injectable()
export class PropertyGroupModifyController implements PropertyGroupModifyControllerInterface {
  constructor(
    @inject(PropertyGroupServiceInterface) private readonly propertyGroupService: PropertyGroupServiceInterface,
  ) {}

  async findByUuid(uuid: string) {
    return await this.propertyGroupService.findByUuid(uuid);
  }

  async create(data: CreatePropertyGroupDto) {
    return await this.propertyGroupService.create(data);
  }

  async update(uuid: string, data: UpdatePropertyGroupDto) {
    return await this.propertyGroupService.update(uuid, data);
  }
}
