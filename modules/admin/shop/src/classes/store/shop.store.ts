import { ShopEntity, ShopService, ShopServiceSymbol } from '@library/domain';

import { injectable, inject } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const ShopStoreSymbol = Symbol.for('ShopStore');

const defaultShop: ShopEntity = {
  uuid: '',
  name: '',
  company: {
    uuid: '',
    name: '',
  },
};

@injectable()
export class ShopStore {
  @observable private data: ShopEntity = defaultShop;

  constructor(@inject(ShopServiceSymbol) private readonly shopService: ShopService) {
    makeObservable(this);
  }

  @action.bound
  private setData(data: ShopEntity) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  async getShopByUUID(uuid: string) {
    this.setData(await this.shopService.getData(uuid));
  }

  async update(data: ShopEntity) {
    await this.shopService.updateShop(data);
  }

  async create(data: ShopEntity) {
    await this.shopService.createShop(data);
  }
}
