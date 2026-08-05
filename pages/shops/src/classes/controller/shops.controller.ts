import { ShopServiceInterface } from '@library/domain';

import { Controller, Inject } from '@sellgar/app';

import { ShopsControllerInterface } from './shops-controller.interface.ts';

@Controller()
export class ShopsController implements ShopsControllerInterface {
  constructor(@Inject(ShopServiceInterface) private readonly shopService: ShopServiceInterface) {}

  async loader() {
    return await this.shopService.findAll();
  }
}
