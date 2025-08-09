import { injectable } from 'inversify';
import { observable, action, computed, makeObservable } from 'mobx';

import { ApplicationStoreInterface } from './application-store.interface.ts';

@injectable()
export class ApplicationStore implements ApplicationStoreInterface {
  @observable _auth = false;
  @observable _initialized = false;

  constructor() {
    makeObservable(this);
  }

  @computed
  get auth() {
    return this._initialized;
  }

  @computed
  get initialized() {
    return this._initialized;
  }

  @action.bound
  setAuth(state: boolean) {
    this._auth = state;
  }

  @action.bound
  setInitialize(state: boolean) {
    this._initialized = state;
  }
}
