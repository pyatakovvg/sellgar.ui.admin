import { PropertyServiceInterface } from '@library/domain';
import {
  Controller,
  FrameServiceInterface,
  Inject,
  RevalidateServiceInterface,
} from '@sellgar/app';

import { PropertyModifyControllerInterface } from './property-modify-controller.interface.ts';

@Controller()
export class PropertyModifyController implements PropertyModifyControllerInterface {
  constructor(
    @Inject(PropertyServiceInterface) private readonly propertyService: PropertyServiceInterface,
    @Inject(FrameServiceInterface) private readonly frameService: FrameServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async loader(args: Parameters<PropertyModifyControllerInterface['loader']>[0]) {
    if (!args.props.uuid) {
      return void 0;
    }

    return this.propertyService.findByUuid(args.props.uuid);
  }

  async action(args: Parameters<PropertyModifyControllerInterface['action']>[0]) {
    if ('uuid' in args.payload) {
      await this.propertyService.update(args.payload.uuid, args.payload);
    } else {
      await this.propertyService.create(args.payload);
    }

    await this.revalidateService.revalidate();
    await this.frameService.close();
  }

  async close() {
    await this.frameService.close();
  }
}
