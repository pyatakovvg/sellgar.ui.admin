import { ShopServiceInterface } from '@library/domain';
import { ShopsRoute } from '@library/route-tokens';

import { Controller, Inject } from '@sellgar/app';
import { NavigateServiceInterface } from '@sellgar/app';

import { ShopModifyControllerInterface } from './shop-modify-controller.interface.ts';
import { ShopFormMapper } from './mapper/shop-form.mapper.ts';

@Controller()
export class ShopModifyController implements ShopModifyControllerInterface {
  constructor(
    @Inject(ShopServiceInterface) private readonly shopService: ShopServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
  ) {}

  async loader(args: Parameters<ShopModifyControllerInterface['loader']>[0]) {
    if (!args.params.uuid) {
      return void 0;
    }

    return { shop: await this.shopService.findByUuid(args.params.uuid) };
  }

  async action(args: Parameters<ShopModifyControllerInterface['action']>[0]) {
    if (args.params.uuid) {
      await this.shopService.update(args.params.uuid, ShopFormMapper.toUpdateInput(args.payload));
    } else {
      await this.shopService.create(ShopFormMapper.toCreateInput(args.payload));
    }

    await this.navigateService.to(ShopsRoute, { revalidate: true });
  }

  async close() {
    await this.navigateService.close();
  }
}
