import { Controller } from '@library/app';

import { makeObservable, observable, action } from 'mobx';

import { StockService } from './stock.service';

@Controller()
export class StockController {
  @observable stock: any[] = [];

  private readonly stockService: StockService = new StockService();

  constructor() {
    makeObservable(this);
  }

  @action
  async getData() {
    this.stock = await this.stockService.getData();
  }
}
