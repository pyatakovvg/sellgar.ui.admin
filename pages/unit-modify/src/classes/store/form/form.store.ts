import { UnitEntity, UnitServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { FormStoreInterface } from './form-store.interface.ts';

@injectable()
export class FormStore implements FormStoreInterface {
  @observable inProcess: boolean = false;
  @observable data: UnitEntity[] = [];

  constructor(@inject(UnitServiceInterface) private readonly unitService: UnitServiceInterface) {
    makeObservable(this);
  }

  @action.bound
  setData(data: UnitEntity[]) {
    this.data = data;
  }

  @action.bound
  setProcess(state: boolean) {
    this.inProcess = state;
  }

  @action.bound
  async create(Unit: UnitEntity) {
    this.setProcess(true);

    try {
      await this.unitService.create(Unit);
    } finally {
      this.setProcess(false);
    }
  }

  @action.bound
  async update(uuid: string, Unit: UnitEntity) {
    this.setProcess(true);

    try {
      await this.unitService.update(uuid, Unit);
    } finally {
      this.setProcess(false);
    }
  }
}
