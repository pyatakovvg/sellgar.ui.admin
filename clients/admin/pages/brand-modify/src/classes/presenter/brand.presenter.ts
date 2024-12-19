import { BrandEntity } from '@library/domain';

import { inject, injectable } from 'inversify';

import { FormStore, FormStoreSymbol } from '../store/form.store.ts';
import { BrandStore, BrandStoreSymbol } from '../store/brand.store.ts';

export const BrandPresenterSymbol = Symbol.for('BrandPresenter');

@injectable()
export class BrandPresenter {
  constructor(
    @inject(FormStoreSymbol) private readonly formStore: FormStore,
    @inject(BrandStoreSymbol) private readonly brandStore: BrandStore,
  ) {}

  async update(uuid: string, category: BrandEntity) {
    await this.formStore.update(uuid, category);
  }

  async create(category: BrandEntity) {
    await this.formStore.create(category);
  }

  getData() {
    return this.brandStore.data;
  }

  getFormInProcess() {
    return this.formStore.inProcess;
  }

  getBrandInProcess() {
    return this.brandStore.inProcess;
  }

  findByUuid(uuid?: string) {
    return this.brandStore.findByUuid(uuid);
  }
}
