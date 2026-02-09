import { ShopEntity } from '@library/domain';

import { injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { ShopStoreInterface } from './shop-store.interface.ts';

@injectable()
export class ShopStore implements ShopStoreInterface {
  @observable shops: ShopEntity[] = [];

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setShops(data: ShopEntity[]) {
    this.shops = data;
  }
}
