import { BrandEntity, MetaEntity } from '@library/domain';

import { injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { BrandStoreInterface } from './brand-store.interface.ts';

@injectable()
export class BrandStore implements BrandStoreInterface {
  @observable data: BrandEntity[] = [];
  @observable meta: MetaEntity;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setData(data: BrandEntity[]) {
    this.data = data;
  }

  @action.bound
  setMeta(meta: MetaEntity) {
    this.meta = meta;
  }
}
