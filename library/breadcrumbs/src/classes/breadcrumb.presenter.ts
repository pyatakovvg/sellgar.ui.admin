import { makeObservable } from 'mobx';

import { BreadcrumbStore } from './breadcrumbs.store.ts';
import type { IBreadcrumb } from './breadcrumbs.store.ts';

export class BreadcrumbPresenter {
  private readonly breadcrumbStore: BreadcrumbStore = new BreadcrumbStore();

  constructor() {
    makeObservable(this);
  }

  getAll(): IBreadcrumb[] {
    return this.breadcrumbStore.getAll();
  }

  getById(id: string): IBreadcrumb | null {
    return this.breadcrumbStore.getById(id);
  }

  update(uuid: string, label: string) {
    this.breadcrumbStore.update(uuid, label);
  }

  add(breadcrumb: IBreadcrumb) {
    this.breadcrumbStore.add(breadcrumb);
  }

  reset() {
    this.breadcrumbStore.reset();
  }
}
