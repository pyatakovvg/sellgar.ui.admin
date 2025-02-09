import { PropertyGroupEntity } from '@library/domain';

import { inject, injectable } from 'inversify';

import { FormStore, FormStoreSymbol } from '../store/form.store.ts';
import { PropertyGroupStore, PropertyGroupStoreSymbol } from '../store/property-group.store.ts';

export const PropertyGroupPresenterSymbol = Symbol.for('PropertyGroupPresenter');

@injectable()
export class PropertyGroupPresenter {
  constructor(
    @inject(FormStoreSymbol) private readonly formStore: FormStore,
    @inject(PropertyGroupStoreSymbol) private readonly unitStore: PropertyGroupStore,
  ) {}

  async update(uuid: string, entity: PropertyGroupEntity) {
    await this.formStore.update(uuid, entity);
  }

  async create(entity: PropertyGroupEntity) {
    await this.formStore.create(entity);
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
