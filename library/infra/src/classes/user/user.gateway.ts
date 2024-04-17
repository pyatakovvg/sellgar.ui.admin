import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { UserEntity } from './entity/user.entity.ts';
import { ResultEntity } from './entity/result.entity.ts';

import { HttpClient, HttpClientSymbol } from '../../helpers/HttpClient';

export const UserGatewaySymbols = Symbol.for('UserGateway');

@injectable()
export class UserGateway {
  constructor(@inject(HttpClientSymbol) private readonly httpClient: HttpClient) {}

  async getAll() {
    const result = await this.httpClient.get<ResultEntity>(import.meta.env.VITE_GATEWAY_API + '/users');
    const resultInstance = plainToInstance(ResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async getByUuid(uuid: string, isFlat?: boolean) {
    const result = await this.httpClient.get<UserEntity>(import.meta.env.VITE_GATEWAY_API + '/users/' + uuid);
    const resultInstance = plainToInstance(UserEntity, result);

    await validateOrReject(resultInstance);

    if (isFlat) {
      return {
        ...resultInstance,
        roles: resultInstance.roles.map((role: any) => role.code),
      };
    }
    return resultInstance;
  }

  async update(uuid: string, body: any) {
    const user = await this.httpClient.put(import.meta.env.VITE_GATEWAY_API + '/users/' + uuid, body);

    return {
      ...user,
      roles: user.roles.map((role: any) => role.code),
    };
  }

  async create(body: any) {
    const user = await this.httpClient.send({
      url: import.meta.env.VITE_GATEWAY_API + '/users',
      method: 'post',
      data: body,
    });

    return {
      ...user,
      roles: user.roles.map((role: any) => role.code),
    };
  }

  delete() {}
}
