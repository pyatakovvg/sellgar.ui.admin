import {
  PropertyEntity,
  PropertyServiceInterface,
  PropertyGroupServiceInterface,
  UnitServiceInterface,
} from '@library/domain';

import { Controller, Inject, type FrameControllerLoaderArgs } from '@tiyn/app';

import { CreatePropertyDto } from './dto/create-property.dto.ts';
import { UpdatePropertyDto } from './dto/update-property.dto.ts';

import { FormStoreInterface } from '../store/form/form-store.interface.ts';
import { PropertyModifyControllerInterface } from './property-modify-controller.interface.ts';
import { type PropertyModifyFrameParams } from '../../property-modify.frame.tsx';

@Controller()
export class PropertyModifyController implements PropertyModifyControllerInterface {
  constructor(
    @Inject(FormStoreInterface) public readonly formStore: FormStoreInterface,
    @Inject(UnitServiceInterface) private readonly unitService: UnitServiceInterface,
    @Inject(PropertyServiceInterface) private readonly propertyService: PropertyServiceInterface,
    @Inject(PropertyGroupServiceInterface) private readonly propertyGroupService: PropertyGroupServiceInterface,
  ) {}

  async loader(args: FrameControllerLoaderArgs<PropertyModifyFrameParams>) {
    return await this.findByUuid(args.props.uuid);
  }

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
