import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { CreateUserDto } from './dto/create-user.dto.ts';
import { UpdateUserDto } from './dto/update-user.dto.ts';

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

  async getByUuid(uuid: string) {
    const result = await this.httpClient.get<UserEntity>(import.meta.env.VITE_GATEWAY_API + '/users/' + uuid);
    const resultInstance = plainToInstance(UserEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async update(uuid: string, body: UpdateUserDto) {
    const result = await this.httpClient.put<UserEntity>(import.meta.env.VITE_GATEWAY_API + '/users/' + uuid, body);
    const resultInstance = plainToInstance(UserEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async create(body: CreateUserDto) {
    const result = await this.httpClient.post<UserEntity>(import.meta.env.VITE_GATEWAY_API + '/users', body);
    const resultInstance = plainToInstance(UserEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  delete() {}
}
