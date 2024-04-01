import { ShopRepository } from './shop.repository.ts';

import type { IShop } from './shop.types.ts';

export class ShopService {
  private readonly shopRepository: ShopRepository = new ShopRepository();

  getData(uuid: string) {
    return this.shopRepository.getShopById(uuid);
  }

  getCompany() {
    return this.shopRepository.getCompany();
  }

  createShop(data: IShop) {
    return this.shopRepository.createShop(data);
  }

  updateShop(data: IShop) {
    return this.shopRepository.updateShop(data);
  }
}
