import { FilterUserDto } from './dto/filter-user.dto.ts';
import { CreateUserDto } from './dto/create-user.dto.ts';
import { UpdateUserDto } from './dto/update-user.dto.ts';

import { UserEntity, UserResultEntity } from '../user.entity.ts';

export abstract class UserGatewayInterface {
  abstract getAll(filter: FilterUserDto): Promise<UserResultEntity>;
  abstract getByUuid(uuid: string): Promise<UserEntity>;
  abstract update(uuid: string, body: UpdateUserDto): Promise<UserEntity>;
  abstract create(body: CreateUserDto): Promise<UserEntity>;
}
