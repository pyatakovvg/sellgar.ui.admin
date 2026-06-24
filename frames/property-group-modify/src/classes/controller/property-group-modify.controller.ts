import { PropertyGroupServiceInterface } from '@library/domain';

import { Controller, Inject, type FrameControllerLoaderArgs } from '@tiyn/app';

import { CreatePropertyGroupDto } from './dto/create-property-group.dto.ts';
import { UpdatePropertyGroupDto } from './dto/update-property-group.dto.ts';

import { PropertyGroupModifyControllerInterface } from './property-group-modify-controller.interface.ts';
import { type PropertyGroupModifyFrameParams } from '../../property-group-modify.frame.tsx';

@Controller()
export class PropertyGroupModifyController implements PropertyGroupModifyControllerInterface {
  constructor(
    @Inject(PropertyGroupServiceInterface) private readonly propertyGroupService: PropertyGroupServiceInterface,
  ) {}

  async loader(args: FrameControllerLoaderArgs<PropertyGroupModifyFrameParams>) {
    if (!args.props.uuid) {
      return void 0;
    }

    return await this.findByUuid(args.props.uuid);
  }

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
