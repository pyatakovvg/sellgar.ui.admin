import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { CompanyStore, CompanyStoreSymbol } from '../store/company.store.ts';
import { GetCompanyCase, GetCompanyCaseSymbol } from '../case/get-company.case.ts';

export const CompanyPresenterSymbol = Symbol.for('CompanyPresenter');

@injectable()
export class CompanyPresenter {
  @observable isLoading: boolean = true;

  constructor(
    @inject(GetCompanyCaseSymbol) private readonly getCompanyCase: GetCompanyCase,
    @inject(CompanyStoreSymbol) private readonly companyStore: CompanyStore,
  ) {
    makeObservable(this);
  }

  @action
  async getData() {
    this.isLoading = true;

    const result = await this.getCompanyCase.execute();

    this.companyStore.setData(result.data);
    this.companyStore.setMeta(result.meta);
    this.isLoading = false;
    console.log(123, this.isLoading);
  }

  @action.bound
  getCompanies() {
    return this.companyStore.getData();
  }

  @action.bound
  getCompaniesMeta() {
    return this.companyStore.getMeta();
  }
}
