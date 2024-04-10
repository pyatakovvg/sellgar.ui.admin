import { makeObservable, observable, action } from 'mobx';

import { ProductsService } from './products.service.ts';

interface IProductsResult {
  data: any[];
  meta: {
    totalRows: number;
  };
}

export class ProductsController {
  @observable products: IProductsResult = { data: [], meta: { totalRows: 0 } };

  private readonly homeService: ProductsService = new ProductsService();

  constructor() {
    makeObservable(this);
  }

  @action
  async getData() {
    this.products = await this.homeService.getData();
  }
}
