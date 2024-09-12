import { RoleEntity, RoleService, RoleServiceSymbol } from '@library/domain';

import { inject, injectable } from 'inversify';
import { action, observable, makeObservable } from 'mobx';

export const FilterStoreSymbol = Symbol.for('FilterStore');

@injectable()
export class FilterStore {
  @observable roles: RoleEntity[] = [];

  constructor(@inject(RoleServiceSymbol) private readonly roleService: RoleService) {
    makeObservable(this);
  }

  @action.bound
  private setRoles(roles: RoleEntity[]) {
    this.roles = roles;
  }

  @action.bound
  async getData() {
    const { data } = await this.roleService.getAll();

    this.setRoles(data);
  }
}
