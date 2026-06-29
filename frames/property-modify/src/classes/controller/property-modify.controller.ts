import { CreatePropertyDto, PropertyServiceInterface, UpdatePropertyDto } from '@library/domain';
import {
  Controller,
  FrameServiceInterface,
  Inject,
  RevalidateServiceInterface,
  type FrameControllerActionArgs,
  type FrameControllerLoaderArgs,
} from '@tiyn/app';

import { PropertyModifyActionPayload, PropertyModifyControllerInterface } from './property-modify-controller.interface.ts';
import { PropertyModifyFrameParams } from '../params';

@Controller()
export class PropertyModifyController implements PropertyModifyControllerInterface {
  constructor(
    @Inject(PropertyServiceInterface) private readonly propertyService: PropertyServiceInterface,
    @Inject(FrameServiceInterface) private readonly frameService: FrameServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async loader(args: FrameControllerLoaderArgs<PropertyModifyFrameParams>) {
    if (!args.props.uuid) {
      return void 0;
    }

    return await this.propertyService.findByUuid(args.props.uuid);
  }

  async action(args: FrameControllerActionArgs<PropertyModifyFrameParams, PropertyModifyActionPayload>) {
    if (args.props.uuid) {
      await this.propertyService.update(args.props.uuid, args.payload as UpdatePropertyDto);
    } else {
      await this.propertyService.create(args.payload as CreatePropertyDto);
    }

    await this.revalidateService.revalidate();
    await this.frameService.close();
  }

  async toList() {
    await this.frameService.close();
  }
}
