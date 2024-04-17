import { injectable, inject } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { GetProductsCase, GetProductsCaseSymbol } from '../case/get-products.case.ts';

import { ProductEntity } from '@library/infra';

export const ProductPresenterSymbol = Symbol.for('ProductPresenter');

@injectable()
export class ProductPresenter {
  @observable isLoading: boolean = true;

  @observable count: number = 0;
  @observable products: ProductEntity[] = [];

  constructor(@inject(GetProductsCaseSymbol) private readonly getProductsCase: GetProductsCase) {
    makeObservable(this);
  }

  @action.bound
  private setLoading(state: boolean) {
    this.isLoading = state;
  }

  @action
  async getData() {
    this.setLoading(true);

    const result = await this.getProductsCase.execute();

    this.products = result.data;
    this.count = result.meta.totalRows;

    this.setLoading(false);
  }
}
