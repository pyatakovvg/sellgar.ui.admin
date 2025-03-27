import { BrandEntity, MetaEntity } from '@library/domain';

import { injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const BrandStoreSymbol = Symbol.for('BrandStore');

@injectable()
export class BrandStore {
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
