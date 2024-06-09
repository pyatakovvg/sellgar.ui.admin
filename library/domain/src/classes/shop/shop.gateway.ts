import { inject, injectable } from 'inversify';

import { ShopEntity } from './entity/shop.entity.ts';

import { HttpClient, HttpClientSymbol } from '../../helpers/HttpClient';

export const ShopGatewaySymbol = Symbol.for('ShopGateway');

@injectable()
export class ShopGateway {
  constructor(@inject(HttpClientSymbol) private readonly httpClient: HttpClient) {}

  getShopById(uuid: string): Promise<ShopEntity> {
    return this.httpClient.send({
      url: import.meta.env.VITE_GATEWAY_API + '/shops/' + uuid,
      method: 'get',
    });
  }

  getCompany(): Promise<any[]> {
    return this.httpClient.send({
      url: import.meta.env.VITE_GATEWAY_API + '/company',
    });
  }

  createShop(data: ShopEntity): Promise<ShopEntity> {
    return this.httpClient.send({
      url: import.meta.env.VITE_GATEWAY_API + '/shops',
      method: 'post',
      data,
    });
  }

  updateShop(data: ShopEntity): Promise<ShopEntity> {
    return this.httpClient.send({
      url: import.meta.env.VITE_GATEWAY_API + '/shops/' + data.uuid,
      method: 'put',
      data,
    });
  }
}
