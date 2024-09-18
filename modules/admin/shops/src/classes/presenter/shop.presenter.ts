import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { ShopsStore, ShopsStoreSymbol } from '../store/shops.store.ts';

export const ShopPresenterSymbol = Symbol.for('ShopPresenter');

@injectable()
export class ShopPresenter {
  @observable isLoading: boolean = true;

  constructor(@inject(ShopsStoreSymbol) private readonly shopStore: ShopsStore) {
    makeObservable(this);
  }

  @action.bound
  private setLoading(state: boolean) {
    this.isLoading = state;
  }

  @action.bound
  async getData() {
    this.setLoading(true);

    await this.shopStore.getShops();

    this.setLoading(false);
  }

  get shopsStore() {
    return this.shopStore;
  }
}
