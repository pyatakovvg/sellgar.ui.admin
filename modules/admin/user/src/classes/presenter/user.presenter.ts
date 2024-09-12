import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { CreateUserDto, UpdateUserDto, RoleEntity, UserEntity } from '@library/domain';

import { UserStore, UserStoreSymbol } from '@/classes/store/user.store.ts';
import { FilterStore, FilterStoreSymbol } from '@/classes/store/filter.store.ts';

export const UserPresenterSymbol = Symbol.for('UserPresenter');

@injectable()
export class UserPresenter {
  @observable isLoading: boolean = true;
  @observable isProcess: boolean = false;

  constructor(
    @inject(UserStoreSymbol) readonly userStore: UserStore,
    @inject(FilterStoreSymbol) readonly filterStore: FilterStore,
  ) {
    makeObservable(this);
  }

  @action
  private setLoading(state: boolean) {
    this.isLoading = state;
  }

  @action
  private setProcess(state: boolean) {
    this.isProcess = state;
  }

  @action.bound
  async getData(uuid?: string) {
    this.setLoading(true);

    await this.filterStore.getData();

    if (uuid) {
      await this.userStore.getData(uuid);
    }

    this.setLoading(false);
  }

  @action.bound
  async updateUser(user: UpdateUserDto) {
    this.setProcess(true);

    await this.userStore.updateUser(user);

    this.setProcess(false);
  }

  @action.bound
  async createUser(userDto: CreateUserDto) {
    this.setProcess(true);

    await this.userStore.createUser(userDto);

    this.setProcess(false);
  }
}
