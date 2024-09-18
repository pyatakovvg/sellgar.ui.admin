import { inject, injectable } from 'inversify';

import { ShopGateway, ShopGatewaySymbol } from './shop.gateway.ts';

import { ShopEntity } from './entity/shop.entity.ts';

export const ShopServiceSymbol = Symbol.for('ShopService');

@injectable()
export class ShopService {
  constructor(@inject(ShopGatewaySymbol) private readonly shopGateway: ShopGateway) {}

  getAll() {
    return this.shopGateway.getAll();
  }

  getData(uuid: string) {
    return this.shopGateway.getShopById(uuid);
  }

  createShop(data: ShopEntity) {
    return this.shopGateway.createShop(data);
  }

  updateShop(data: ShopEntity) {
    return this.shopGateway.updateShop(data);
  }
}
