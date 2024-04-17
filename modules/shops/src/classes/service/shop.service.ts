import { inject, injectable } from 'inversify';

import { ShopGateway, ShopGatewaySymbol } from '../gateway/shop.gateway.ts';

export const ShopServiceSymbol = Symbol.for('ShopService');

@injectable()
export class ShopService {
  constructor(@inject(ShopGatewaySymbol) private readonly shopGateway: ShopGateway) {}

  async getData(): Promise<any> {
    return await this.shopGateway.getProducts();
  }
}
