import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { ShopStore, ShopStoreSymbol } from '../store/shop.store.ts';

export const ShopPresenterSymbol = Symbol.for('ShopPresenter');

@injectable()
export class ShopPresenter {
  @observable private isLoading: boolean = true;

  constructor(@inject(ShopStoreSymbol) private readonly shopStore: ShopStore) {
    makeObservable(this);
  }

  @action.bound
  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  @action.bound
  async getData(uuid: string) {
    this.setLoading(true);

    if (uuid) {
      await this.shopStore.getShopByUUID(uuid);
    }

    this.setLoading(false);
  }

  getShopStore() {
    return this.shopStore;
  }
}
