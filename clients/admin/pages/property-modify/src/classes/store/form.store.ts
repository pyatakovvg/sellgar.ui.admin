import { PropertyEntity, PropertyServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const FormStoreSymbol = Symbol.for('FormStore');

@injectable()
export class FormStore {
  @observable inProcess: boolean = false;
  @observable data: PropertyEntity[] = [];

  constructor(@inject(PropertyServiceInterface) private readonly propertyService: PropertyServiceInterface) {
    makeObservable(this);
  }

  @action.bound
  setData(data: PropertyEntity[]) {
    this.data = data;
  }

  @action.bound
  setProcess(state: boolean) {
    this.inProcess = state;
  }

  @action.bound
  async create(Property: PropertyEntity) {
    this.setProcess(true);

    try {
      await this.propertyService.create(Property);
    } finally {
      this.setProcess(false);
    }
  }

  @action.bound
  async update(uuid: string, Property: PropertyEntity) {
    this.setProcess(true);

    try {
      await this.propertyService.update(uuid, Property);
    } finally {
      this.setProcess(false);
    }
  }
}
