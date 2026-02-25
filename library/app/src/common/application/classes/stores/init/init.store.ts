import { observable, action, makeAutoObservable } from 'mobx';

import { InitStoreInterface } from './init-store.interface.ts';

export class InitStore implements InitStoreInterface {
  @observable isInit: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action.bound
  setInit(state: boolean) {
    this.isInit = state;
  }
}
