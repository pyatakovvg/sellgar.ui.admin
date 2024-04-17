import { inject, injectable } from 'inversify';
import { action, observable, makeObservable } from 'mobx';

import { GetUserCase, GetUserCaseSymbol } from '../case/get-user.case.ts';

import { ProfileEntity } from '../gateway/entity/profile.entity.ts';

export const ProfilePresenterSymbol = Symbol.for('ProfilePresenter');

const initialize: ProfileEntity = {
  person: {
    firstName: '',
    middleName: '',
    lastName: '',
  },
  roles: [],
  permissions: [],
};

@injectable()
export class ProfilePresenter {
  constructor(@inject(GetUserCaseSymbol) private readonly getUserCase: GetUserCase) {
    makeObservable(this);
  }

  @observable profile: ProfileEntity = initialize;

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

    this.setProfile(profile);
  }

  @action.bound
  setProfile(profile: any) {
    this.profile = profile;
  }

  @action.bound
  resetProfile() {
    this.setProfile(initialize);
  }
}
