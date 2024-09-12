import { RoleEntity, RoleService, RoleServiceSymbol } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, action, observable } from 'mobx';

export const FilterStoreSymbol = Symbol.for('FilterStore');

@injectable()
export class FilterStore {
  @observable inProcess: boolean = true;
  @observable roles: RoleEntity[] = [];

  constructor(@inject(RoleServiceSymbol) private readonly roleService: RoleService) {
    makeObservable(this);
  }

  @action.bound
  private setProcess(process: boolean) {
    this.inProcess = process;
  }

  @action.bound
  private setRoles(roles: RoleEntity[]) {
    this.roles = roles;
  }

  @action.bound
  async getFilterData() {
    this.setProcess(true);

    const { data } = await this.roleService.getAll();

    this.setRoles(data);

    this.setProcess(false);
  }
}
