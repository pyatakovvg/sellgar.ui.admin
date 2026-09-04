import { ShopServiceInterface, type ShopEntity } from '@library/domain';
import { Controller, Inject } from '@sellgar/app';

import { ShopListControllerInterface } from './shop-list-controller.interface.ts';
@Controller()
export class ShopListController implements ShopListControllerInterface {
  constructor(@Inject(ShopServiceInterface) private readonly shopService: ShopServiceInterface) {}

  async loader(): Promise<ShopEntity[]> {
    const result = await this.shopService.findAll();

    return result.data;
  }
}
