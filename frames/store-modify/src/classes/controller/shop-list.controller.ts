import { ShopEntity, ShopServiceInterface } from '@library/domain';
import { Controller, Inject, type FrameControllerLoaderArgs } from '@sellgar/app';

import { ShopListControllerInterface } from './shop-list-controller.interface.ts';
import { StoreModifyFrameParams } from '../params';

@Controller()
export class ShopListController implements ShopListControllerInterface {
  constructor(@Inject(ShopServiceInterface) private readonly shopService: ShopServiceInterface) {}

  async loader(_args: FrameControllerLoaderArgs<StoreModifyFrameParams>): Promise<ShopEntity[]> {
    const result = await this.shopService.findAll();

    return result.data;
  }
}
