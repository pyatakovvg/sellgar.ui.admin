import { HttpClient, HttpClientSymbol } from '../../helpers/HttpClient';

import { injectable, inject } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { ResultEntity } from './entity/result.entity.ts';

export const CompanyGatewaySymbol = Symbol.for('CompanyGateway');

@injectable()
export class CompanyGateway {
  constructor(@inject(HttpClientSymbol) private readonly httpClient: HttpClient) {}

  async getAll(): Promise<ResultEntity> {
    const result = await this.httpClient.get<ResultEntity>(import.meta.env.VITE_GATEWAY_API + '/v1/companies');
    const resultInstance = plainToInstance(ResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
