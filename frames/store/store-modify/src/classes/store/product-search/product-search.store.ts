import { Injectable } from '@sellgar/app';
import type { ProductSummaryEntity } from '@library/domain';
import { makeAutoObservable, observable } from 'mobx';

import { ProductSearchStoreInterface } from './product-search-store.interface.ts';

@Injectable()
export class ProductSearchStore implements ProductSearchStoreInterface {
  options: ProductSummaryEntity[] = [];
  loading = false;
  error: string | undefined;

  constructor() {
    makeAutoObservable(this, { options: observable.ref });
  }

  start(): void {
    this.options = [];
    this.loading = true;
    this.error = undefined;
  }

  complete(options: ProductSummaryEntity[]): void {
    this.options = options;
    this.loading = false;
  }

  fail(message: string): void {
    this.options = [];
    this.loading = false;
    this.error = message;
  }

  reset(): void {
    this.options = [];
    this.loading = false;
    this.error = undefined;
  }
}
