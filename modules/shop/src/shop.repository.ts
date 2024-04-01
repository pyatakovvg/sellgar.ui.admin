import { Fetch } from '@library/app';

import type { IShop, ICompany } from './shop.types.ts';

export class ShopRepository {
  private readonly fetch: Fetch = new Fetch({
    baseURL: import.meta.env.VITE_GATEWAY_API,
  });

  getShopById(uuid: string): Promise<IShop> {
    return this.fetch.send({
      url: '/shops/' + uuid,
      method: 'get',
    });
  }

  getCompany(): Promise<ICompany[]> {
    return this.fetch.send({
      url: '/company',
    });
  }

  createShop(data: IShop): Promise<IShop> {
    return this.fetch.send({
      url: '/shops',
      method: 'post',
      data,
    });
  }

  updateShop(data: IShop): Promise<IShop> {
    return this.fetch.send({
      url: '/shops/' + data.uuid,
      method: 'put',
      data,
    });
  }
}
