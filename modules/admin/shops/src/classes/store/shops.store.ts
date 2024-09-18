import { ShopEntity, ShopService, ShopServiceSymbol, MetaEntity } from '@library/domain';

import { injectable, inject } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const ShopsStoreSymbol = Symbol.for('ShopsStore');

class Error {
  constructor(
    public status: string = '',
    public message: string = '',
  ) {}
}

@injectable()
export class ShopsStore {
  @observable private isLoading: boolean = true;
  @observable private error: Error | null = null;

  @observable private data: ShopEntity[] = [];
  @observable private meta: MetaEntity = { totalRows: 0 };

  constructor(@inject(ShopServiceSymbol) private readonly shopService: ShopService) {
    makeObservable(this);
  }

  @action.bound
  async getShops() {
    try {
      this.isLoading = true;

      const result = await this.shopService.getAll();

      this.data = result.data;
      this.meta = result.meta;
    } catch (e) {
      this.error = new Error('0.0.1', 'Ошибка получения магазинов ' + (e as Error).message);
    } finally {
      this.isLoading = false;
    }
  }

  @action.bound
  getData() {
    return this.data;
  }

  @action.bound
  getMeta() {
    return this.meta;
  }

  getError() {
    return this.error;
  }
}
