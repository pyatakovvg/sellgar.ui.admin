import { PropertyEntity, MetaEntity } from '@library/domain';

import { Injectable } from '@sellgar/app';
import { makeObservable, observable, action } from 'mobx';

import { PropertyStoreInterface } from './property-store.interface.ts';

@Injectable()
export class PropertyStore implements PropertyStoreInterface {
  @observable data: PropertyEntity[] = [];
  @observable meta: MetaEntity;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setData(data: PropertyEntity[]) {
    this.data = data;
  }

  @action.bound
  setMeta(meta: MetaEntity) {
    this.meta = meta;
  }
}
