import { injectable, inject } from 'inversify';

import { CompanyGateway, CompanyGatewaySymbol } from './company.gateway.ts';

export const CompanyServiceSymbol = Symbol.for('CompanyService');

@injectable()
export class CompanyService {
  constructor(@inject(CompanyGatewaySymbol) private readonly companyGateway: CompanyGateway) {}

  getAll() {
    return this.companyGateway.getAll();
  }
}
