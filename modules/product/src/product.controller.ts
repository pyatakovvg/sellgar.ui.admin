import { Controller } from '@library/app';

import { makeObservable, observable, action } from 'mobx';

import { ProductService } from './product.service.ts';

@Controller()
export class ProductController {
  @observable product: any = {};

  private readonly productService: ProductService = new ProductService();

  constructor() {
    makeObservable(this);
  }

  @action
  async getData(uuid: string) {
    this.product = await this.productService.getData(uuid);
  }
}
