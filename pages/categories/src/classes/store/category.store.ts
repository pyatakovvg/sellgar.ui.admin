import { CategoryEntity, MetaEntity } from '@library/domain';

import { injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { CategoryStoreInterface } from './category-store.interface.ts';

@injectable()
export class CategoryStore implements CategoryStoreInterface {
  @observable data: CategoryEntity[] = [];
  @observable meta: MetaEntity;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setData(data: CategoryEntity[]) {
    this.data = data;
  }

  @action.bound
  setMeta(meta: MetaEntity) {
    this.meta = meta;
  }
}
