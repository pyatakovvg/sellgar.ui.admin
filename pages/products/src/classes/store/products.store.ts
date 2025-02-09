import { UnitEntity, MetaEntity, ProductServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const ProductsStoreSymbol = Symbol.for('ProductsStore');

@injectable()
export class ProductsStore {
  @observable inProcess: boolean = true;
  @observable data: UnitEntity[] = [];
  @observable meta: MetaEntity;

  constructor(@inject(ProductServiceInterface) private readonly productService: ProductServiceInterface) {
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
      const result = await this.productService.findAll();
      console.log(result);
      this.setData(result.data);
      this.setMeta(result.meta);
    } finally {
      this.setProcess(false);
    }
  }
}
