import {
  PropertyEntity,
  PropertyServiceInterface,
  PropertyGroupServiceInterface,
  UnitServiceInterface,
} from '@library/domain';

import { inject, injectable } from 'inversify';

import { CreatePropertyDto } from './dto/create-property.dto.ts';
import { UpdatePropertyDto } from './dto/update-property.dto.ts';

import { FormStoreInterface } from '../store/form/form-store.interface.ts';
import { PropertyModifyControllerInterface } from './property-modify-controller.interface.ts';

@injectable()
export class PropertyModifyController implements PropertyModifyControllerInterface {
  constructor(
    @inject(FormStoreInterface) public readonly formStore: FormStoreInterface,
    @inject(UnitServiceInterface) private readonly unitService: UnitServiceInterface,
    @inject(PropertyServiceInterface) private readonly propertyService: PropertyServiceInterface,
    @inject(PropertyGroupServiceInterface) private readonly propertyGroupService: PropertyGroupServiceInterface,
  ) {}

  async findByUuid(uuid?: string) {
    const units = await this.unitService.findAll();
    const grouns = await this.propertyGroupService.findAll();

    this.formStore.setUnits(units.data);
    this.formStore.setGroups(grouns.data);

    if (uuid) {
      return await this.propertyService.findByUuid(uuid);
    }
    return new PropertyEntity();
  }

  async create(data: CreatePropertyDto) {
    return await this.propertyService.create(data);
  }

  async update(uuid: string, data: UpdatePropertyDto) {
    return await this.propertyService.update(uuid, data);
  }
}
