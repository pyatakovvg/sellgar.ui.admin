import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { GetCompanyCase, GetCompanyCaseSymbol } from '../case/get-company.case.ts';

export const CompanyPresenterSymbol = Symbol.for('CompanyPresenter');

@injectable()
export class CompanyPresenter {
  @observable isLoading: boolean = true;
  @observable company: any[] = [];

  constructor(@inject(GetCompanyCaseSymbol) private readonly getCompanyCase: GetCompanyCase) {
    makeObservable(this);
  }

  @action
  async getData() {
    this.isLoading = true;
    this.company = await this.getCompanyCase.execute();
    setTimeout(() => (this.isLoading = false), 600 * Math.random());
  }
}
