import { makeObservable, observable, action } from 'mobx';

import { CompanyWidgetService } from './company-widget.service.ts';

import type { ICompany } from './company-widget.types.ts';

export interface IDashboardController {
  company: ICompany[];
  getData(): void;
}

export class CompanyWidgetController implements IDashboardController {
  @observable isLoading: boolean = true;
  @observable company: ICompany[] = [];

  private readonly companyWidgetService: CompanyWidgetService = new CompanyWidgetService();

  constructor() {
    makeObservable(this);
  }

  @action
  async getData() {
    this.isLoading = true;
    this.company = await this.companyWidgetService.getCompany();
    setTimeout(() => (this.isLoading = false), 600 * Math.random());
  }
}
