import { PropertyServiceInterface } from '@library/domain';
import { Controller, Inject, RevalidateServiceInterface } from '@sellgar/app-v2';
import { NavigateServiceInterface } from '@sellgar/app-v2';

import { PropertyModifyControllerInterface } from './property-modify-controller.interface.ts';

@Controller()
export class PropertyModifyController implements PropertyModifyControllerInterface {
  constructor(
    @Inject(PropertyServiceInterface) private readonly propertyService: PropertyServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async loader(args: Parameters<PropertyModifyControllerInterface['loader']>[0]) {
    if (!args.params.uuid) {
      return void 0;
    }

    return this.propertyService.findByUuid(args.params.uuid);
  }

  async action(args: Parameters<PropertyModifyControllerInterface['action']>[0]) {
    if ('uuid' in args.payload) {
      await this.propertyService.update(args.payload.uuid, args.payload);
    } else {
      await this.propertyService.create(args.payload);
    }

    await this.revalidateService.revalidate();
    await this.navigateService.close();
  }

  async close() {
    await this.navigateService.close();
  }
}
