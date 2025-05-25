import { ProfileEntity } from '@library/domain';

import { injectable } from 'inversify';
import { action, observable, computed, makeObservable } from 'mobx';

import { ProfileStoreInterface } from './profile-store.interface.ts';

@injectable()
export class ProfileStore implements ProfileStoreInterface {
  @observable _profile: ProfileEntity = new ProfileEntity();

  constructor() {
    makeObservable(this);
  }

  @computed
  get profile() {
    return this._profile;
  }

  @action.bound
  setProfile(profile: any) {
    this._profile = profile;
  }

  checkRoles(targetRoles: string[]): boolean {
    if (!targetRoles.length) {
      return true;
    }
    return targetRoles.some((targetRole) => this._profile.roles.includes(targetRole));
  }

  checkPermissions(targetPermissions: string[]): boolean {
    if (!targetPermissions.length) {
      return true;
    }
    return targetPermissions.some((targetPermission) => this._profile.permissions.includes(targetPermission));
  }
}
