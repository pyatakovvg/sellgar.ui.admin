import { CreateUserInput } from '../data/gateway/input/create-user.input.ts';
import { FilterUserInput } from '../data/gateway/input/filter-user.input.ts';
import { UpdateUserInput } from '../data/gateway/input/update-user.input.ts';
import { UserEntity } from '../domain/user.entity.ts';
import { UserResultEntity } from '../domain/user-result.entity.ts';

export abstract class UserServiceInterface {
  abstract getAll(filter: FilterUserInput): Promise<UserResultEntity>;
  abstract getByUuid(uuid: string): Promise<UserEntity>;
  abstract update(input: UpdateUserInput): Promise<UserEntity>;
  abstract create(input: CreateUserInput): Promise<UserEntity>;
}
