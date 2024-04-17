import { inject, injectable } from 'inversify';

import { CompanyGateway, CompanyGatewaySymbol } from '../gateway/company.gateway.ts';

export const CompanyServiceSymbol = Symbol.for('CompanyService');

@injectable()
export class CompanyService {
  constructor(@inject(CompanyGatewaySymbol) private readonly companyGateway: CompanyGateway) {}

  async getCompany() {
    return await this.companyGateway.getCompany();
  }
}
