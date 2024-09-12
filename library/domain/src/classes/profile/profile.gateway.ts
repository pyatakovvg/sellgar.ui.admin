import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { ResultEntity } from './entity/result.entity.ts';

import { HttpClient, HttpClientSymbol } from '../../helpers/HttpClient';

export const ProfileGatewaySymbols = Symbol.for('ProfileGateway');

@injectable()
export class ProfileGateway {
  constructor(@inject(HttpClientSymbol) private readonly httpClient: HttpClient) {}

  async get() {
    const result = await this.httpClient.get<ResultEntity>(import.meta.env.VITE_GATEWAY_API + '/v1/profile');
    const resultInstance = plainToInstance(ResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
