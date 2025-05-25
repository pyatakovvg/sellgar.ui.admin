import { PriceEntity } from '@library/domain';

import { injectable } from 'inversify';
import { makeAutoObservable, computed, observable, action } from 'mobx';

import { PriceStoreInterface } from './price-store.interface.ts';

@injectable()
export class PriceStore implements PriceStoreInterface {
  @observable private _inProcess: boolean = false;
  @observable private _prices: PriceEntity[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @computed
  get inProcess() {
    return this._inProcess;
  }

  @computed
  get prices() {
    return this._prices ?? [];
  }

  @action.bound
  setInProcess(state: boolean) {
    this._inProcess = state;
  }

  @action.bound
  setPrices(prices: PriceEntity[]) {
    this._prices = prices;
  }
}
