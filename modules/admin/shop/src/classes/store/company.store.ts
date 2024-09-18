import { CompanyEntity, CompanyService, CompanyServiceSymbol } from '@library/domain';

import { injectable, inject } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const CompanyStoreSymbol = Symbol.for('CompanyStore');

@injectable()
export class CompanyStore {
  @observable private data: CompanyEntity[] = [];

  constructor(@inject(CompanyServiceSymbol) private readonly companyService: CompanyService) {
    makeObservable(this);
  }

  @action.bound
  private setData(data: CompanyEntity[]) {
    this.data = data;
  }

  async getCompanies() {
    const result = await this.companyService.getAll();

    this.setData(result.data);
  }

  getData() {
    return this.data;
  }
}
