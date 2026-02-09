import { VariantEntity } from '@library/domain';

import { injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { VariantsStoreInterface } from './variants-store.interface.ts';

@injectable()
export class VariantsStore implements VariantsStoreInterface {
  @observable variants: VariantEntity[] = [];

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setVariants(data: VariantEntity[]) {
    this.variants = data;
  }
}
