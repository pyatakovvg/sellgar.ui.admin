import { BrandEntity, MetaEntity, BrandServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const BrandStoreSymbol = Symbol.for('BrandStore');

@injectable()
export class BrandStore {
  @observable inProcess: boolean = true;
  @observable data: BrandEntity[] = [];
  @observable meta: MetaEntity;

  constructor(@inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface) {
    makeObservable(this);
  }

  @action.bound
  setData(data: BrandEntity[]) {
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
      const result = await this.brandService.findAll();

      this.setData(result.data);
      this.setMeta(result.meta);
    } finally {
      this.setProcess(false);
    }
  }
}
