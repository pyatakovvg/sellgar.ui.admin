import { injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { BreadcrumbEntity } from '../breadcrumb.entity.ts';

export const BreadcrumbStoreSymbol = Symbol.for('BreadcrumbStore');

@injectable()
export class BreadcrumbStore {
  @observable private breadcrumbs: BreadcrumbEntity[] = [];

  constructor() {
    makeObservable(this);
  }

  getAll() {
    return this.breadcrumbs;
  }

  getById(id: string): BreadcrumbEntity | null {
    return this.breadcrumbs.find((breadcrumb) => breadcrumb.id === id) ?? null;
  }

  @action.bound
  add(data: BreadcrumbEntity) {
    this.breadcrumbs.push(data);
  }

  @action.bound
  reset() {
    this.breadcrumbs = [];
  }

  @action.bound
  update(uuid: string, label: string) {
    const breadcrumb = this.getById(uuid);
    if (breadcrumb) {
      breadcrumb.inProcess = false;
      breadcrumb.params.label = label;
    }
  }
}
