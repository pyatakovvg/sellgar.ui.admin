import { makeObservable } from 'mobx';
import { injectable, inject } from 'inversify';

import { BreadcrumbEntity } from '../breadcrumb.entity.ts';
import { BreadcrumbStore, BreadcrumbStoreSymbol } from '../stores/breadcrumbs.store.ts';

export const BreadcrumbPresenterSymbol = Symbol.for('BreadcrumbPresenter');

@injectable()
export class BreadcrumbPresenter {
  constructor(@inject(BreadcrumbStoreSymbol) private readonly breadcrumbStore: BreadcrumbStore) {
    makeObservable(this);
  }

  getAll(): BreadcrumbEntity[] {
    return this.breadcrumbStore.getAll();
  }

  getById(id: string): BreadcrumbEntity | null {
    return this.breadcrumbStore.getById(id);
  }

  update(uuid: string, label: string) {
    this.breadcrumbStore.update(uuid, label);
  }

  add(breadcrumb: BreadcrumbEntity) {
    this.breadcrumbStore.add(breadcrumb);
  }

  reset() {
    this.breadcrumbStore.reset();
  }
}
