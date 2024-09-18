import { inject, injectable } from 'inversify';

import { CompanyService, CompanyServiceSymbol } from '@library/domain';

export const GetCompanyCaseSymbol = Symbol.for('GetCompanyCase');

@injectable()
export class GetCompanyCase {
  constructor(@inject(CompanyServiceSymbol) private companyService: CompanyService) {}

  execute() {
    return this.companyService.getAll();
  }
}
