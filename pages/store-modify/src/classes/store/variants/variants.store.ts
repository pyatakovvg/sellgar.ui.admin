import { ProductVariantEntity } from '@library/domain';

import { injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { VariantsStoreInterface } from './variants-store.interface.ts';

@injectable()
export class VariantsStore implements VariantsStoreInterface {
  @observable inProcess: boolean = false;
  @observable variants: ProductVariantEntity[] = [];

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setProcess(state: boolean) {
    this.inProcess = state;
  }

  @action.bound
  setVariants(variants: ProductVariantEntity[]) {
    this.variants = variants;
  }
}
