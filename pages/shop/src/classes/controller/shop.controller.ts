import { ShopServiceInterface } from '@library/domain';

import { Controller, Inject } from '@tiyn/app';

import { ShopControllerInterface } from './shop-controller.interface.ts';

@Controller()
export class ShopController implements ShopControllerInterface {
  constructor(@Inject(ShopServiceInterface) private readonly shopService: ShopServiceInterface) {}

  async loader() {
    return await this.shopService.findAll();
  }
}
