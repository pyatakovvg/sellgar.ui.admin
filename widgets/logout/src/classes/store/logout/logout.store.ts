import { injectable } from 'inversify';
import { makeAutoObservable, observable, computed, action } from 'mobx';

import { LogoutStoreInterface } from './logout-store.interface.ts';

@injectable()
export class LogoutStore implements LogoutStoreInterface {
  @observable private _inProcess: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @computed
  get inProcess() {
    return this._inProcess;
  }

  @action.bound
  setProcess(state: boolean) {
    this._inProcess = state;
  }
}
