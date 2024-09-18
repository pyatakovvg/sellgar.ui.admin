import { inject, injectable } from 'inversify';

import { ShopEntity } from './entity/shop.entity.ts';
import { ResultEntity } from './entity/result.entity.ts';

import { HttpClient, HttpClientSymbol } from '../../helpers/HttpClient';

export const ShopGatewaySymbol = Symbol.for('ShopGateway');

@injectable()
export class ShopGateway {
  constructor(@inject(HttpClientSymbol) private readonly httpClient: HttpClient) {}

  getAll(): Promise<ResultEntity> {
    return this.httpClient.send({
      url: import.meta.env.VITE_GATEWAY_API + '/v1/shops',
      method: 'get',
    });
  }

  getShopById(uuid: string): Promise<ShopEntity> {
    return this.httpClient.send({
      url: import.meta.env.VITE_GATEWAY_API + '/v1/shops/' + uuid,
      method: 'get',
    });
  }

  createShop(data: ShopEntity): Promise<ShopEntity> {
    return this.httpClient.send({
      url: import.meta.env.VITE_GATEWAY_API + '/v1/shops',
      method: 'post',
      data,
    });
  }

  updateShop(data: ShopEntity): Promise<ShopEntity> {
    return this.httpClient.send({
      url: import.meta.env.VITE_GATEWAY_API + '/v1/shops/' + data.uuid,
      method: 'put',
      data,
    });
  }
}
