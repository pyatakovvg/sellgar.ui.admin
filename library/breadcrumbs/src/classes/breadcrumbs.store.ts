import { makeObservable, observable, action } from 'mobx';

export interface IBreadcrumbParams {
  label: string;
  href?: string;
}

export interface IBreadcrumb {
  id?: string;
  type: 'FUNCTION' | 'CRUMB';
  inProcess: boolean;
  params: IBreadcrumbParams;
}

export class BreadcrumbStore {
  @observable private breadcrumbs: IBreadcrumb[] = [];

  constructor() {
    makeObservable(this);
  }

  getAll() {
    return this.breadcrumbs;
  }

  getById(id: string): IBreadcrumb | null {
    return this.breadcrumbs.find((breadcrumb) => breadcrumb.id === id) ?? null;
  }

  @action.bound
  add(data: IBreadcrumb) {
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
