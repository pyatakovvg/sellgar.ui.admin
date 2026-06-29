import { CreatePropertyGroupDto, PropertyGroupServiceInterface, UpdatePropertyGroupDto } from '@library/domain';
import {
  Controller,
  FrameServiceInterface,
  Inject,
  RevalidateServiceInterface,
  type FrameControllerActionArgs,
  type FrameControllerLoaderArgs,
} from '@tiyn/app';

import {
  PropertyGroupModifyActionPayload,
  PropertyGroupModifyControllerInterface,
} from './property-group-modify-controller.interface.ts';
import { PropertyGroupModifyFrameParams } from '../params';

@Controller()
export class PropertyGroupModifyController implements PropertyGroupModifyControllerInterface {
  constructor(
    @Inject(PropertyGroupServiceInterface) private readonly propertyGroupService: PropertyGroupServiceInterface,
    @Inject(FrameServiceInterface) private readonly frameService: FrameServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async loader(args: FrameControllerLoaderArgs<PropertyGroupModifyFrameParams>) {
    if (!args.props.uuid) {
      return void 0;
    }

    return await this.propertyGroupService.findByUuid(args.props.uuid);
  }

  async action(args: FrameControllerActionArgs<PropertyGroupModifyFrameParams, PropertyGroupModifyActionPayload>) {
    if (args.props.uuid) {
      await this.propertyGroupService.update(args.props.uuid, args.payload as UpdatePropertyGroupDto);
    } else {
      await this.propertyGroupService.create(args.payload as CreatePropertyGroupDto);
    }

    await this.revalidateService.revalidate();
    await this.frameService.close();
  }

  async toList() {
    await this.frameService.close();
  }
}
