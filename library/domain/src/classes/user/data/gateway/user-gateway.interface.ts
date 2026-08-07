import { CreateUserInput } from './input/create-user.input.ts';
import { FilterUserInput } from './input/filter-user.input.ts';
import { UpdateUserInput } from './input/update-user.input.ts';

import { UserEntity } from '../../domain/user.entity.ts';
import { UserResultEntity } from '../../domain/user-result.entity.ts';

export abstract class UserGatewayInterface {
  abstract getAll(filter: FilterUserInput): Promise<UserResultEntity>;
  abstract getByUuid(uuid: string): Promise<UserEntity>;
  abstract update(uuid: string, input: UpdateUserInput): Promise<UserEntity>;
  abstract create(input: CreateUserInput): Promise<UserEntity>;
}
