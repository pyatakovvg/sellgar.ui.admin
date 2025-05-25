import { injectable } from 'inversify';
import { observable, action, computed, makeObservable } from 'mobx';

import { ApplicationStoreInterface } from './application-store.interface.ts';

@injectable()
export class ApplicationStore implements ApplicationStoreInterface {
  @observable _initialized = false;

  constructor() {
    makeObservable(this);
  }

  @computed
  get initialized() {
    return this._initialized;
  }

  @action.bound
  setInitialize(state: boolean) {
    this._initialized = state;
  }
}
