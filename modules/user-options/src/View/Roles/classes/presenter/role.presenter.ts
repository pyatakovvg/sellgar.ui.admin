import { RoleService, RoleServiceSymbol, RoleEntity } from '@library/infra';

import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { c } from '@client/admin/build/assets/bootstrap-BVr0ShKU';

export const RolePresenterSymbol = Symbol.for('RolePresenter');

@injectable()
export class RolePresenter {
  @observable roles: RoleEntity[] = [];
  @observable count: number = 0;

  constructor(@inject(RoleServiceSymbol) private readonly roleService: RoleService) {
    makeObservable(this);
  }

  @action
  private setRoles(roles: RoleEntity[]) {
    this.roles = roles;
  }

  @action
  private setCount(count: number) {
    this.count = count;
  }

  @action
  async getAll() {
    const result = await this.roleService.getAll();

    this.setRoles(result.data);
    this.setCount(result.meta.totalRows);
  }
}
