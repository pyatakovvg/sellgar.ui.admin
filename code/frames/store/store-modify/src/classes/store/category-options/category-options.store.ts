import { Injectable } from '@sellgar/app';
import type { CategoryNodeEntity } from '@library/domain';
import { makeAutoObservable, observable } from 'mobx';

import { CategoryOptionsStoreInterface } from './category-options-store.interface.ts';

@Injectable()
export class CategoryOptionsStore implements CategoryOptionsStoreInterface {
  options: CategoryNodeEntity[] = [];
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

  complete(options: CategoryNodeEntity[]): void {
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
