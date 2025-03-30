import { PropertyGroupEntity, MetaEntity } from '@library/domain';

import { injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { PropertyStoreInterface } from './property-store.interface.ts';

@injectable()
export class PropertyStore implements PropertyStoreInterface {
  @observable data: PropertyGroupEntity[] = [];
  @observable meta: MetaEntity;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setData(data: PropertyGroupEntity[]) {
    this.data = data;
  }

  @action.bound
  setMeta(meta: MetaEntity) {
    this.meta = meta;
  }
}
