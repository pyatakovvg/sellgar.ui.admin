import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';

import { UserEntity, UserResultEntity } from '../user.entity.ts';

import { FilterUserDto } from './dto/filter-user.dto.ts';
import { CreateUserDto } from './dto/create-user.dto.ts';
import { UpdateUserDto } from './dto/update-user.dto.ts';

import { UserGatewayInterface } from './user-gateway.interface.ts';

@injectable()
export class UserGateway implements UserGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async getAll(filter: FilterUserDto) {
    const result = await this.httpClient.get<UserResultEntity>(this.config.get('GATEWAY_API') + '/users', {
      params: filter,
    });
    const resultInstance = plainToInstance(UserResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async getByUuid(uuid: string) {
    const result = await this.httpClient.get<UserEntity>(this.config.get('GATEWAY_API') + '/users/' + uuid);
    const resultInstance = plainToInstance(UserEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async update(uuid: string, body: UpdateUserDto) {
    const result = await this.httpClient.put<UserEntity>(this.config.get('GATEWAY_API') + '/users/' + uuid, body);
    const resultInstance = plainToInstance(UserEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async create(body: CreateUserDto) {
    const result = await this.httpClient.post<UserEntity>(this.config.get('GATEWAY_API') + '/users', body);
    const resultInstance = plainToInstance(UserEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  delete() {}
}
