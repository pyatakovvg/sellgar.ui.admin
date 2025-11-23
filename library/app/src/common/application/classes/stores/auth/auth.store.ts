import { observable, action, makeAutoObservable } from 'mobx';

import { AuthStoreInterface } from './auth-store.interface.ts';

export class AuthStore implements AuthStoreInterface {
  @observable isAuth: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action.bound
  setAuth(state: boolean) {
    this.isAuth = state;
  }
}
