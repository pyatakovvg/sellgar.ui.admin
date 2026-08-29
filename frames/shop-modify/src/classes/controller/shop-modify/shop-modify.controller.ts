import { ShopServiceInterface } from '@library/domain';

import { Controller, Inject, RevalidateServiceInterface } from '@sellgar/app-v2';
import { NavigateServiceInterface } from '@sellgar/app-v2';

import { ShopModifyControllerInterface } from './shop-modify-controller.interface.ts';

@Controller()
export class ShopModifyController implements ShopModifyControllerInterface {
  constructor(
    @Inject(ShopServiceInterface) private readonly shopService: ShopServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async loader(args: Parameters<ShopModifyControllerInterface['loader']>[0]) {
    if (!args.params.uuid) {
      return void 0;
    }

    return this.shopService.findByUuid(args.params.uuid);
  }

  async action(args: Parameters<ShopModifyControllerInterface['action']>[0]) {
    if ('uuid' in args.payload) {
      await this.shopService.update(args.payload.uuid, args.payload);
    } else {
      await this.shopService.create(args.payload);
    }

    await this.revalidateService.revalidate();
    await this.navigateService.close();
  }

  async close() {
    await this.navigateService.close();
  }
}
