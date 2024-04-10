import { makeObservable, observable, action } from 'mobx';

import { ShopService } from './shop.service.ts';

import type { ICompany, IShop } from './shop.types.ts';

export class ShopController {
  @observable company: ICompany[] = [];
  @observable shop: Partial<IShop> = { uuid: null, name: '', address: '', company: { uuid: null } };

  private readonly shopService: ShopService = new ShopService();

  constructor() {
    makeObservable(this);
  }

  @action.bound
  async getData(uuid: string) {
    this.shop = await this.shopService.getData(uuid);
  }

  @action.bound
  async getCompany() {
    this.company = await this.shopService.getCompany();
  }

  async save(data: IShop) {
    if (data.uuid) {
      this.shop = await this.shopService.updateShop(data);
    } else {
      this.shop = await this.shopService.createShop(data);
    }
  }
}
