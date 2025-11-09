import { UnitEntity, PropertyGroupEntity } from '@library/domain';

import { injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { FormStoreInterface } from './form-store.interface.ts';

@injectable()
export class FormStore implements FormStoreInterface {
  @observable units: UnitEntity[] = [];
  @observable groups: PropertyGroupEntity[] = [];

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setUnits(data: UnitEntity[]) {
    this.units = data;
  }

  @action.bound
  setGroups(data: PropertyGroupEntity[]) {
    this.groups = data;
  }
}
