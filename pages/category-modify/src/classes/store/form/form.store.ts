import { CategoryEntity } from '@library/domain';

import { injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { FormStoreInterface } from './form-store.interface.ts';

@injectable()
export class FormStore implements FormStoreInterface {
  @observable inProcess: boolean = false;
  @observable categories: CategoryEntity[] = [];

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setProcess(state: boolean) {
    this.inProcess = state;
  }

  @action.bound
  setCategories(data: CategoryEntity[]) {
    this.categories = data;
  }
}
