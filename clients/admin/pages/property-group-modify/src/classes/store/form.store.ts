import { PropertyGroupEntity, PropertyGroupServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const FormStoreSymbol = Symbol.for('FormStore');

@injectable()
export class FormStore {
  @observable inProcess: boolean = false;
  @observable data: PropertyGroupEntity[] = [];

  constructor(
    @inject(PropertyGroupServiceInterface) private readonly propertyGroupService: PropertyGroupServiceInterface,
  ) {
    makeObservable(this);
  }

  @action.bound
  setData(data: PropertyGroupEntity[]) {
    this.data = data;
  }

  @action.bound
  setProcess(state: boolean) {
    this.inProcess = state;
  }

  @action.bound
  async create(entity: PropertyGroupEntity) {
    this.setProcess(true);

    try {
      await this.propertyGroupService.create(entity);
    } finally {
      this.setProcess(false);
    }
  }

  @action.bound
  async update(uuid: string, entity: PropertyGroupEntity) {
    this.setProcess(true);

    try {
      await this.propertyGroupService.update(uuid, entity);
    } finally {
      this.setProcess(false);
    }
  }
}
