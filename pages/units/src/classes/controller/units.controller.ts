import { inject, injectable } from 'inversify';

import { UnitStore, UnitStoreSymbol } from '../store/unit.store.ts';

export const UnitsControllerSymbol = Symbol.for('UnitsController');

@injectable()
export class UnitsController {
  constructor(@inject(UnitStoreSymbol) private readonly unitStore: UnitStore) {}

  getData() {
    return this.unitStore.data;
  }

  getMeta() {
    return this.unitStore.meta;
  }

  getInProcess() {
    return this.unitStore.inProcess;
  }

  async findAll() {
    return await this.unitStore.findAll();
  }
}
