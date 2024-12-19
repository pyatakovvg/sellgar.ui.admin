import { ProfileEntity, ProfileServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { action, observable, makeObservable } from 'mobx';

export const ProfileStoreSymbol = Symbol.for('ProfileStore');

@injectable()
export class ProfileStore {
  @observable profile: ProfileEntity;

  constructor(@inject(ProfileServiceInterface) private readonly profileService: ProfileServiceInterface) {
    makeObservable(this);
  }

  @action.bound
  setProfile(profile: any) {
    this.profile = profile;
  }

  checkRoles(targetRoles: string[]): boolean {
    console.log(targetRoles);
    // if (!targetRoles.length) {
    //   return true;
    // }
    // return targetRoles.some((targetRole) => this.profile.roles.includes(targetRole));
    return true;
  }

  checkPermissions(targetPermissions: string[]): boolean {
    console.log(targetPermissions);
    // if (!targetPermissions.length) {
    //   return true;
    // }
    // return targetPermissions.some((targetPermission) => this.profile.permissions.includes(targetPermission));
    return true;
  }

  async loadProfile() {
    const profile = await this.profileService.get();

    this.setProfile(profile.data);
  }

  resetProfile() {
    this.setProfile(undefined);
  }
}
