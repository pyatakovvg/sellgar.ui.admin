import { CompanyEntity, MetaEntity } from '@library/domain';

import { injectable } from 'inversify';
import { observable, action, makeObservable } from 'mobx';

export const CompanyStoreSymbol = Symbol.for('CompanyStore');

@injectable()
export class CompanyStore {
  @observable private data: CompanyEntity[] = [];
  @observable private meta: MetaEntity = { totalRows: 0 };

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setData(data: CompanyEntity[]) {
    this.data = data;
  }

  @action.bound
  getData() {
    return this.data;
  }

  @action.bound
  setMeta(meta: MetaEntity) {
    this.meta = meta;
  }

  @action.bound
  getMeta() {
    return this.meta;
  }
}
