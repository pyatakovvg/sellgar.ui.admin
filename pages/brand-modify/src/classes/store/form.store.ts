import { BrandEntity, BrandServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const FormStoreSymbol = Symbol.for('FormStore');

@injectable()
export class FormStore {
  @observable inProcess: boolean = false;
  @observable data: BrandEntity[] = [];

  constructor(@inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface) {
    makeObservable(this);
  }

  @action.bound
  setData(data: BrandEntity[]) {
    this.data = data;
  }

  @action.bound
  setProcess(state: boolean) {
    this.inProcess = state;
  }

  @action.bound
  async create(brand: BrandEntity) {
    this.setProcess(true);

    try {
      await this.brandService.create(brand);
    } finally {
      this.setProcess(false);
    }
  }

  @action.bound
  async update(uuid: string, brand: BrandEntity) {
    this.setProcess(true);

    try {
      await this.brandService.update(uuid, brand);
    } finally {
      this.setProcess(false);
    }
  }
}
