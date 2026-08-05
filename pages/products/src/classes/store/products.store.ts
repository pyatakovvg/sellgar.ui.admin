import { ProductEntity, MetaEntity } from '@library/domain';

import { Injectable } from '@sellgar/app';
import { makeObservable, observable, action } from 'mobx';

import { ProductsStoreInterface } from './products-store.interface.ts';

@Injectable()
export class ProductsStore implements ProductsStoreInterface {
  @observable inProcess: boolean = true;
  @observable data: ProductEntity[] = [];
  @observable meta: MetaEntity;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setData(data: ProductEntity[]) {
    this.data = data;
  }

  @action.bound
  setMeta(meta: MetaEntity) {
    this.meta = meta;
  }

  @action.bound
  setProcess(state: boolean) {
    this.inProcess = state;
  }
}
