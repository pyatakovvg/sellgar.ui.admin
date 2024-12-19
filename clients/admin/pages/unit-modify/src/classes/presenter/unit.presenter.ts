import { BrandEntity } from '@library/domain';

import { inject, injectable } from 'inversify';

import { FormStore, FormStoreSymbol } from '../store/form.store.ts';
import { UnitStore, UnitStoreSymbol } from '../store/unit.store.ts';

export const UnitPresenterSymbol = Symbol.for('UnitPresenter');

@injectable()
export class UnitPresenter {
  constructor(
    @inject(FormStoreSymbol) private readonly formStore: FormStore,
    @inject(UnitStoreSymbol) private readonly unitStore: UnitStore,
  ) {}

  async update(uuid: string, category: BrandEntity) {
    await this.formStore.update(uuid, category);
  }

  async create(category: BrandEntity) {
    await this.formStore.create(category);
  }

  getData() {
    return this.unitStore.data;
  }

  getFormInProcess() {
    return this.formStore.inProcess;
  }

  getBrandInProcess() {
    return this.unitStore.inProcess;
  }

  findByUuid(uuid?: string) {
    return this.unitStore.findByUuid(uuid);
  }
}
