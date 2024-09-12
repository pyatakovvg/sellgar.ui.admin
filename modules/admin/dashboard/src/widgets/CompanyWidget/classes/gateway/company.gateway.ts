import { HttpClient, HttpClientSymbol } from '@library/domain';

import { inject, injectable } from 'inversify';

import { CompanyEntity } from './entity/company.entity.ts';

export const CompanyGatewaySymbol = Symbol.for('CompanyGateway');

@injectable()
export class CompanyGateway {
  constructor(@inject(HttpClientSymbol) private readonly httpClient: HttpClient) {}

  getCompany(): Promise<CompanyEntity[]> {
    return this.httpClient.get<CompanyEntity[]>(import.meta.env.VITE_GATEWAY_API + '/company');
  }
}
