import { UnitEntity, MetaEntity, UnitServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const UnitStoreSymbol = Symbol.for('UnitStore');

@injectable()
export class UnitStore {
  @observable inProcess: boolean = true;
  @observable data: UnitEntity[] = [];
  @observable meta: MetaEntity;

  constructor(@inject(UnitServiceInterface) private readonly unitService: UnitServiceInterface) {
    makeObservable(this);
  }

  @action.bound
  setData(data: UnitEntity[]) {
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

  @action.bound
  async findAll() {
    this.setProcess(true);

    try {
      const result = await this.unitService.findAll();

      this.setData(result.data);
      this.setMeta(result.meta);
    } finally {
      this.setProcess(false);
    }
  }
}
