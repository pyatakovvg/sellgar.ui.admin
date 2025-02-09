import { PropertyEntity } from '@library/domain';

import { inject, injectable } from 'inversify';

import { FormStore, FormStoreSymbol } from '../store/form.store.ts';
import { PropertyStore, PropertyStoreSymbol } from '../store/property.store.ts';

export const PropertyPresenterSymbol = Symbol.for('PropertyPresenter');

@injectable()
export class PropertyPresenter {
  constructor(
    @inject(FormStoreSymbol) private readonly formStore: FormStore,
    @inject(PropertyStoreSymbol) private readonly unitStore: PropertyStore,
  ) {}

  async update(uuid: string, entity: PropertyEntity) {
    await this.formStore.update(uuid, entity);
  }

  async create(entity: PropertyEntity) {
    await this.formStore.create(entity);
  }

  getData() {
    return this.unitStore.data;
  }

  getUnits() {
    return this.unitStore.units;
  }

  getGroups() {
    return this.unitStore.groups;
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
