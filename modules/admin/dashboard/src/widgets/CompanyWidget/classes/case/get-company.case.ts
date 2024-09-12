import { inject, injectable } from 'inversify';

import { CompanyService, CompanyServiceSymbol } from '../service/company.service.ts';

export const GetCompanyCaseSymbol = Symbol.for('GetCompanyCase');

@injectable()
export class GetCompanyCase {
  constructor(@inject(CompanyServiceSymbol) private companyService: CompanyService) {}

  execute() {
    return this.companyService.getCompany();
  }
}
