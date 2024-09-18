import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { ShopEntity } from '@library/domain';

import { ShopStore, ShopStoreSymbol } from '../store/shop.store.ts';
import { CompanyStore, CompanyStoreSymbol } from '../store/company.store.ts';

export const ShopPresenterSymbol = Symbol.for('ShopPresenter');

@injectable()
export class ShopPresenter {
  @observable private isLoading: boolean = true;

  constructor(
    @inject(ShopStoreSymbol) private readonly shopStore: ShopStore,
    @inject(CompanyStoreSymbol) private readonly companyStore: CompanyStore,
  ) {
    makeObservable(this);
  }

  @action.bound
  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  @action.bound
  async getData(uuid: string) {
    this.setLoading(true);

    await this.companyStore.getCompanies();

    if (uuid) {
      await this.shopStore.getShopByUUID(uuid);
    }

    this.setLoading(false);
  }

  async upsert(data: ShopEntity) {
    console.log(123, !!data.uuid);
    if (!!data.uuid) {
      await this.shopStore.update(data);
    } else {
      await this.shopStore.create(data);
    }
  }

  getShopStore() {
    return this.shopStore;
  }

  getCompanyStore() {
    return this.companyStore;
  }
}
