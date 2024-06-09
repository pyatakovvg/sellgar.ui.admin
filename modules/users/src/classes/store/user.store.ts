import { UserService, UserServiceSymbol, UserEntity } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const UserStoreSymbol = Symbol.for('UserStore');

@injectable()
export class UserStore {
  @observable count: number = 0;
  @observable users: UserEntity[] = [];

  constructor(@inject(UserServiceSymbol) private readonly userService: UserService) {
    makeObservable(this);
  }

  @action.bound
  private setUsers(users: UserEntity[]) {
    this.users = users;
  }

  @action.bound
  private setCount(count: number) {
    this.count = count;
  }

  @action.bound
  async getUsers(filter: any) {
    const { data, meta } = await this.userService.getAll(filter);

    this.setUsers(data);
    this.setCount(meta.totalRows);
  }
}
