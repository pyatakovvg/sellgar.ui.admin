import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { ShopService, ShopServiceSymbol } from '../service/shop.service.ts';

interface IProductsResult {
  data: any[];
  meta: {
    totalRows: number;
  };
}

export const ShopPresenterSymbol = Symbol.for('ShopPresenter');

@injectable()
export class ShopPresenter {
  @observable products: IProductsResult = { data: [], meta: { totalRows: 0 } };

  constructor(@inject(ShopServiceSymbol) private readonly shopService: ShopService) {
    makeObservable(this);
  }

  @action
  async getData() {
    this.products = await this.shopService.getData();
  }
}
