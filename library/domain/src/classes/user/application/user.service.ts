import { Inject, Injectable } from '@sellgar/app';

import { UserServiceInterface } from './user-service.interface.ts';
import { UserGatewayInterface } from '../data/gateway/user-gateway.interface.ts';
import { CreateUserInput } from '../data/gateway/input/create-user.input.ts';
import { FilterUserInput } from '../data/gateway/input/filter-user.input.ts';
import { UpdateUserInput } from '../data/gateway/input/update-user.input.ts';
import { UserEntity } from '../domain/user.entity.ts';
import { UserResultEntity } from '../domain/user-result.entity.ts';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(@Inject(UserGatewayInterface) private readonly userGateway: UserGatewayInterface) {}

  getAll(filter: FilterUserInput): Promise<UserResultEntity> {
    return this.userGateway.getAll(filter);
  }

  getByUuid(uuid: string): Promise<UserEntity> {
    return this.userGateway.getByUuid(uuid);
  }

  update(input: UpdateUserInput): Promise<UserEntity> {
    return this.userGateway.update(input.uuid, input);
  }

  create(input: CreateUserInput): Promise<UserEntity> {
    return this.userGateway.create(input);
  }
}
