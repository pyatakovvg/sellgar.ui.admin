import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { ShopService, ShopServiceSymbol } from '../service/shop.service.ts';

import type { ICompany, IShop } from '../../shop.types.ts';

export const ShopPresenterSymbol = Symbol.for('ShopPresenter');

@injectable()
export class ShopPresenter {
  @observable company: ICompany[] = [];
  @observable shop: Partial<IShop> = { uuid: null, name: '', address: '', company: { uuid: null } };

  constructor(@inject(ShopServiceSymbol) private readonly shopService: ShopService) {
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
