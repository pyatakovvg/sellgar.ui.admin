import { ProfileEntity } from '@library/domain';

import { inject, injectable } from 'inversify';
import { action, observable, makeObservable } from 'mobx';

import { GetUserCase, GetUserCaseSymbol } from '../case/get-user.case.ts';

export const ProfileStoreSymbol = Symbol.for('ProfileStore');

const initialize: ProfileEntity = {
  uuid: '',
  login: '',
  isBlocked: false,
  roles: [],
  permissions: [],
  user: {
    uuid: '',
    name: '',
    surname: '',
    patronymic: '',
    birthday: null,
    sex: null,
  },
};

@injectable()
export class ProfileStore {
  constructor(@inject(GetUserCaseSymbol) private readonly getUserCase: GetUserCase) {
    makeObservable(this);
  }

  @observable profile: ProfileEntity = initialize;

  @action.bound
  setProfile(profile: any) {
    this.profile = profile;
  }

  checkRoles(targetRoles: string[]): boolean {
    if (!targetRoles.length) {
      return true;
    }
    return targetRoles.some((targetRole) => this.profile.roles.includes(targetRole));
  }

  checkPermissions(targetPermissions: string[]): boolean {
    if (!targetPermissions.length) {
      return true;
    }
    return targetPermissions.some((targetPermission) => this.profile.permissions.includes(targetPermission));
  }

  @action.bound
  async getProfile() {
    const profile = await this.getUserCase.execute();

    this.setProfile(profile.data);
  }

  @action.bound
  resetProfile() {
    this.setProfile(initialize);
  }
}
