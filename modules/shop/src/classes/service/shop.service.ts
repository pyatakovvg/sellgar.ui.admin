import { inject, injectable } from 'inversify';

import { ShopGateway, ShopGatewaySymbol } from '../gateway/shop.gateway.ts';

import type { IShop } from '../../shop.types.ts';

export const ShopServiceSymbol = Symbol.for('ShopService');

@injectable()
export class ShopService {
  constructor(@inject(ShopGatewaySymbol) private readonly shopGateway: ShopGateway) {}

  getData(uuid: string) {
    return this.shopGateway.getShopById(uuid);
  }

  getCompany() {
    return this.shopGateway.getCompany();
  }

  createShop(data: IShop) {
    return this.shopGateway.createShop(data);
  }

  updateShop(data: IShop) {
    return this.shopGateway.updateShop(data);
  }
}
