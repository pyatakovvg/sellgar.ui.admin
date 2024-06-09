import { inject, injectable } from 'inversify';
import { action, observable, makeObservable } from 'mobx';

import { GetUserCase, GetUserCaseSymbol } from '../case/get-user.case.ts';

import { ProfileEntity } from '../gateway/entity/profile.entity.ts';

export const ProfileStoreSymbol = Symbol.for('ProfileStore');

const initialize: ProfileEntity = {
  person: {
    uuid: '',
    firstName: '',
    middleName: '',
    lastName: '',
    birthday: '',
    sex: 'MALE',
    fullName: '',
  },
  roles: [],
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
    return targetRoles.some((targetRole) => this.profile.roles.map((role) => role.code).includes(targetRole));
  }

  checkPermissions(targetPermissions: string[]): boolean {
    if (!targetPermissions.length) {
      return true;
    }
    return targetPermissions.some((targetPermission) =>
      this.profile.roles.some((targetRole) =>
        targetRole.permissions.map((permission) => permission.code).includes(targetPermission),
      ),
    );
  }

  @action.bound
  async getProfile() {
    const profile = await this.getUserCase.execute();

    this.setProfile(profile);
  }

  @action.bound
  resetProfile() {
    this.setProfile(initialize);
  }
}
