import { CategoryEntity } from '@library/domain';

import { injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { FormStoreInterface } from './form-store.interface.ts';

@injectable()
export class FormStore implements FormStoreInterface {
  @observable categories: CategoryEntity[] = [];

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setCategories(data: CategoryEntity[]) {
    this.categories = data;
  }
}
