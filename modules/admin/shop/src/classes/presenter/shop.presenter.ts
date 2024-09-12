import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { ShopEntity, ShopService, ShopServiceSymbol } from '@library/domain';

export const ShopPresenterSymbol = Symbol.for('ShopPresenter');

@injectable()
export class ShopPresenter {
  @observable company: any[] = [];
  @observable shop: Partial<ShopEntity> = {};
  @observable isLoading: boolean = true;

  constructor(@inject(ShopServiceSymbol) private readonly shopService: ShopService) {
    makeObservable(this);
  }

  @action.bound
  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  @action.bound
  setShop(shop: ShopEntity) {
    this.shop = shop;
  }

  @action.bound
  async getData(uuid: string) {
    this.setLoading(true);

    await this.getCompany();

    if (uuid) {
      this.setShop(await this.shopService.getData(uuid));
    }

    this.setLoading(false);
  }

  @action.bound
  async getCompany() {
    this.company = await this.shopService.getCompany();
  }

  async save(data: ShopEntity) {
    if (data.uuid) {
      this.shop = await this.shopService.updateShop(data);
    } else {
      this.shop = await this.shopService.createShop(data);
    }
  }
}
