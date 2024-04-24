import { HttpClient, HttpClientSymbol } from '@library/domain';

import { inject, injectable } from 'inversify';

import type { IShop, ICompany } from '../../shop.types.ts';

export const ShopGatewaySymbol = Symbol.for('ShopGateway');

@injectable()
export class ShopGateway {
  constructor(@inject(HttpClientSymbol) private readonly httpClient: HttpClient) {}

  getShopById(uuid: string): Promise<IShop> {
    return this.httpClient.send({
      url: import.meta.env.VITE_GATEWAY_API + '/shops/' + uuid,
      method: 'get',
    });
  }

  getCompany(): Promise<ICompany[]> {
    return this.httpClient.send({
      url: import.meta.env.VITE_GATEWAY_API + '/company',
    });
  }

  createShop(data: IShop): Promise<IShop> {
    return this.httpClient.send({
      url: import.meta.env.VITE_GATEWAY_API + '/shops',
      method: 'post',
      data,
    });
  }

  updateShop(data: IShop): Promise<IShop> {
    return this.httpClient.send({
      url: import.meta.env.VITE_GATEWAY_API + '/shops/' + data.uuid,
      method: 'put',
      data,
    });
  }
}
