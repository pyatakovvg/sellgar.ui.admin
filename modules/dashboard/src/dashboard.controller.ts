import { Controller } from '@library/app';

import { makeObservable, observable, action } from 'mobx';

import { DashboardService } from './dashboard.service';

export interface IDashboardController {
  company: any;
  getData(): void;
}

@Controller()
export class DashboardController implements IDashboardController {
  @observable isLoading: boolean = true;
  @observable company: any = null;

  private readonly dashboardService: DashboardService = new DashboardService();

  constructor() {
    makeObservable(this);
  }

  @action
  async getData() {
    this.isLoading = true;
    this.company = await this.dashboardService.getCompany();
    this.isLoading = false;
  }
}
