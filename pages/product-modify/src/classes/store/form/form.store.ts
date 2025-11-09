import { BrandEntity, CategoryEntity, PropertyEntity } from '@library/domain';

import { injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { FormStoreInterface } from './form-store.interface.ts';

@injectable()
export class FormStore implements FormStoreInterface {
  @observable brands: BrandEntity[] = [];
  @observable categories: CategoryEntity[] = [];
  @observable properties: PropertyEntity[] = [];

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setBrands(brands: BrandEntity[]) {
    this.brands = brands;
  }

  @action.bound
  setCategories(categories: CategoryEntity[]) {
    this.categories = categories;
  }

  @action.bound
  setProperties(properties: PropertyEntity[]) {
    this.properties = properties;
  }
}
