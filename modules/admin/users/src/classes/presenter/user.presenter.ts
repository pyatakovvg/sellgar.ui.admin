import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { UserStore, UserStoreSymbol } from '@/classes/store/user.store.ts';
import { FilterStore, FilterStoreSymbol } from '@/classes/store/filter.store.ts';

export const UserPresenterSymbol = Symbol.for('UserPresenter');

@injectable()
export class UserPresenter {
  @observable inProcess: boolean = true;
  @observable inUpdateProcess: boolean = false;

  constructor(
    @inject(UserStoreSymbol) readonly userStore: UserStore,
    @inject(FilterStoreSymbol) readonly filterStore: FilterStore,
  ) {
    makeObservable(this);
  }

  static normalizeFilter(values: any) {
    const resultFilter: any = {};

    if (values.roles && values.roles.length) {
      resultFilter['roles'] = values.roles;
    }

    if (values.isBlocked) {
      resultFilter['isBlocked'] = values.isBlocked !== 'ACTIVE';
    }

    if (values.page > 0) {
      resultFilter.take = import.meta.env.VITE_TAKE;
      resultFilter.skip = import.meta.env.VITE_TAKE * (values.page - 1);
    } else {
      resultFilter.skip = 0;
      resultFilter.take = import.meta.env.VITE_TAKE;
    }

    return resultFilter;
  }

  @action.bound
  private setProcess(process: boolean) {
    this.inProcess = process;
  }

  @action.bound
  private setUpdateProcess(process: boolean) {
    this.inUpdateProcess = process;
  }

  @action.bound
  async getData(filter: any) {
    this.setProcess(true);

    await this.filterStore.getFilterData();
    await this.userStore.getUsers(UserPresenter.normalizeFilter(filter));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.setProcess(false);
  }

  @action.bound
  async refreshData(filter: any) {
    this.setUpdateProcess(true);

    await this.userStore.getUsers(UserPresenter.normalizeFilter(filter));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.setUpdateProcess(false);
  }
}
