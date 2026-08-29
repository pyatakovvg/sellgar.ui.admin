import { ShopServiceInterface } from '@library/domain';

import { Controller, Inject } from '@sellgar/app-v2';

import { ShopControllerInterface } from './shop-controller.interface.ts';

@Controller()
export class ShopController implements ShopControllerInterface {
  constructor(@Inject(ShopServiceInterface) private readonly shopService: ShopServiceInterface) {}

  loader() {
    return this.shopService.findAll();
  }
}
