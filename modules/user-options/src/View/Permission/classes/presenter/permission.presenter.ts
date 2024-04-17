import { PermissionService, PermissionServiceSymbol, PermissionEntity } from '@library/infra';

import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';

export const PermissionPresenterSymbol = Symbol.for('PermissionPresenter');

@injectable()
export class PermissionPresenter {
  @observable permissions: PermissionEntity[] = [];
  @observable count: number = 0;

  constructor(@inject(PermissionServiceSymbol) private readonly permissionService: PermissionService) {
    makeObservable(this);
  }

  @action
  private setPermissions(roles: PermissionEntity[]) {
    this.permissions = roles;
  }

  @action
  private setCount(count: number) {
    this.count = count;
  }

  async getAll() {
    const result = await this.permissionService.getAll();

    this.setPermissions(result.data);
    this.setCount(result.meta.totalRows);
  }
}
