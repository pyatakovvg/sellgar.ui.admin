import { omitBy, isUndefined } from 'lodash';
import { Inject, Injectable } from '@sellgar/app';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { FilterUserDto } from '../gateway/dto/filter-user.dto.ts';
import { CreateUserDto } from '../gateway/dto/create-user.dto.ts';
import { UpdateUserDto } from '../gateway/dto/update-user.dto.ts';

import { UserServiceInterface } from './user-service.interface.ts';
import { UserGatewayInterface } from '../gateway/user-gateway.interface.ts';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(@Inject(UserGatewayInterface) private readonly userGateway: UserGatewayInterface) {}

  getAll(filter: FilterUserDto) {
    const filterInstance = plainToInstance(FilterUserDto, filter, {
      exposeUnsetFields: false,
    });

    return this.userGateway.getAll(omitBy(filterInstance, isUndefined));
  }

  getByUuid(uuid: string) {
    return this.userGateway.getByUuid(uuid);
  }

  async update(body: UpdateUserDto) {
    const instance = plainToInstance(UpdateUserDto, body);
    await validateOrReject(instance);
    return await this.userGateway.update(instance.uuid, instance);
  }

  async create(body: CreateUserDto) {
    await validateOrReject(body);
    return await this.userGateway.create(body);
  }
}
