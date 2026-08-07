import { Inject, Injectable } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { HttpClientInterface } from '../../../../infrastructure/http-client/http-client.interface.ts';
import { UserEntity } from '../../domain/user.entity.ts';
import { UserResultEntity } from '../../domain/user-result.entity.ts';
import { CreateUserDto } from './dto/create-user.dto.ts';
import { FilterUserDto } from './dto/filter-user.dto.ts';
import { UpdateUserDto } from './dto/update-user.dto.ts';
import { CreateUserInput } from './input/create-user.input.ts';
import { FilterUserInput } from './input/filter-user.input.ts';
import { UpdateUserInput } from './input/update-user.input.ts';
import { UserGatewayInterface } from './user-gateway.interface.ts';

@Injectable()
export class UserGateway implements UserGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async getAll(filter: FilterUserInput): Promise<UserResultEntity> {
    const dto = plainToInstance(FilterUserDto, filter, { exposeUnsetFields: false });
    await validateOrReject(dto);
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/users', { params: dto });
    const entity = plainToInstance(UserResultEntity, result);
    await validateOrReject(entity);
    return entity;
  }

  async getByUuid(uuid: string): Promise<UserEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/users/' + uuid);
    return this.toUser(result);
  }

  async update(uuid: string, input: UpdateUserInput): Promise<UserEntity> {
    const dto = plainToInstance(UpdateUserDto, input);
    await validateOrReject(dto);
    const result = await this.httpClient.put(this.config.get('GATEWAY_API') + '/users/' + uuid, dto);
    return this.toUser(result);
  }

  async create(input: CreateUserInput): Promise<UserEntity> {
    const dto = plainToInstance(CreateUserDto, input);
    await validateOrReject(dto);
    const result = await this.httpClient.post(this.config.get('GATEWAY_API') + '/users', dto);
    return this.toUser(result);
  }

  private async toUser(result: unknown): Promise<UserEntity> {
    const entity = plainToInstance(UserEntity, result);
    await validateOrReject(entity);
    return entity;
  }
}
