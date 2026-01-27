import { ShopServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { ShopControllerInterface } from './shop-controller.interface.ts';

@injectable()
export class ShopController implements ShopControllerInterface {
  constructor(@inject(ShopServiceInterface) private readonly shopService: ShopServiceInterface) {}

  async loader() {
    return await this.shopService.findAll();
  }
}
