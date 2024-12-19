import { FilterUserDto } from '../gateway/dto/filter-user.dto.ts';
import { CreateUserDto } from '../gateway/dto/create-user.dto.ts';
import { UpdateUserDto } from '../gateway/dto/update-user.dto.ts';

export abstract class UserServiceInterface {
  abstract getAll(filter: FilterUserDto): Promise<any>;
  abstract getByUuid(uuid: string): Promise<any>;
  abstract update(body: UpdateUserDto): Promise<any>;
  abstract create(body: CreateUserDto): Promise<any>;
}
