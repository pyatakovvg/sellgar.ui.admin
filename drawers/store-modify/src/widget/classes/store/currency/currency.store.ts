import { CurrencyEntity } from '@library/domain';

import { injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { CurrencyStoreInterface } from './currency-store.interface.ts';

@injectable()
export class CurrencyStore implements CurrencyStoreInterface {
  @observable currency: CurrencyEntity[] = [];

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setCurrency(data: CurrencyEntity[]) {
    this.currency = data;
  }
}
