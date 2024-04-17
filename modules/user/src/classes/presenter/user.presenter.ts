import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { UserEntity, RoleEntity, UserService, UserServiceSymbol, RoleService, RoleServiceSymbol } from '@library/infra';

export const UserPresenterSymbol = Symbol.for('UserPresenter');

const initialize: Partial<UserEntity> = {
  person: {
    firstName: '',
    middleName: '',
    lastName: '',
  },
  roles: [],
  isBlocked: false,
  claims: [],
};

@injectable()
export class UserPresenter {
  @observable roles: RoleEntity[] = [];
  @observable user: Partial<UserEntity> = initialize;

  @observable isLoadingProcess = false;
  @observable isUpsertProcess = false;

  constructor(
    @inject(RoleServiceSymbol) private readonly roleService: RoleService,
    @inject(UserServiceSymbol) private readonly userService: UserService,
  ) {
    makeObservable(this);
  }

  @action
  setRoles(roles: RoleEntity[]) {
    this.roles = roles;
  }

  @action.bound
  async getData(uuid?: string) {
    this.isLoadingProcess = true;

    const rolesResult = await this.roleService.getAll();

    this.setRoles(rolesResult.data);

    if (uuid) {
      this.user = await this.userService.getByUuid(uuid, true);
    }

    this.isLoadingProcess = false;
  }

  async updateUser(body: any) {
    return await this.userService.update(body);
  }

  async createUser(body: any) {
    return await this.userService.create(body);
  }

  async save(data: any) {
    this.isUpsertProcess = true;
    if (data.uuid) {
      this.user = await this.updateUser(data);
    } else {
      this.user = await this.createUser(data);
    }
    this.isUpsertProcess = false;
  }
}
