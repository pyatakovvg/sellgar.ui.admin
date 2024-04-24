import { UserService, UserServiceSymbol, UserEntity } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const UserPresenterSymbol = Symbol.for('UserPresenter');

@injectable()
export class UserPresenter {
  @observable isLoading: boolean = true;
  @observable count: number = 0;
  @observable users: UserEntity[] = [];

  constructor(@inject(UserServiceSymbol) private readonly userService: UserService) {
    makeObservable(this);
  }

  @action
  private setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  @action
  private setUsers(users: UserEntity[]) {
    this.users = users;
  }

  @action
  private setCount(count: number) {
    this.count = count;
  }

  @action.bound
  async getData() {
    this.setLoading(true);

    const result = await this.userService.getAll();

    this.setUsers(result.data);
    this.setCount(result.meta.totalRows);

    this.setLoading(false);
  }
}
