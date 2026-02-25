import { ProfileEntity } from '@library/domain';

import { observable, action, makeAutoObservable } from 'mobx';

import { ProfileStoreInterface } from './profile-store.interface.ts';

export class ProfileStore implements ProfileStoreInterface {
  @observable data: ProfileEntity = new ProfileEntity();

  constructor() {
    makeAutoObservable(this);
  }

  @action.bound
  reset() {
    this.data = new ProfileEntity();
  }

  @action.bound
  setData(data: ProfileEntity) {
    this.data = data;
  }
}
