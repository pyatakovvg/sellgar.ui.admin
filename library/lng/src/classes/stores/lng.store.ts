import { injectable } from 'inversify';
import { observable, action, makeAutoObservable } from 'mobx';

export const LngStoreSymbol = Symbol.for('LngStore');

@injectable()
export class LngStore {
  @observable isInitialized = false;
  @observable loadingResource: { [key: string]: boolean } = {};

  constructor() {
    makeAutoObservable(this);
  }

  @action.bound
  setInitialized() {
    this.isInitialized = true;
  }

  @action.bound
  setLoadingResource(ns: string, state: boolean) {
    console.log(7777, ns, state);
    this.loadingResource[ns] = state;
    console.log(8888, this.loadingResource);
  }

  getLoadingResource() {
    return Object.keys(this.loadingResource)
      .map((key) => {
        return this.loadingResource[key];
      })
      .includes(true);
  }
}
