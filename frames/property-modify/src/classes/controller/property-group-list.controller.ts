import { PropertyGroupEntity, PropertyGroupServiceInterface } from '@library/domain';
import { Controller, Inject, type FrameControllerLoaderArgs } from '@tiyn/app';

import { PropertyGroupListControllerInterface } from './property-group-list-controller.interface.ts';
import { PropertyModifyFrameParams } from '../params';

@Controller()
export class PropertyGroupListController implements PropertyGroupListControllerInterface {
  constructor(@Inject(PropertyGroupServiceInterface) private readonly propertyGroupService: PropertyGroupServiceInterface) {}

  async loader(_args: FrameControllerLoaderArgs<PropertyModifyFrameParams>): Promise<PropertyGroupEntity[]> {
    const result = await this.propertyGroupService.findAll();

    return result.data;
  }
}
