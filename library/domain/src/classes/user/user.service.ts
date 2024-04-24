import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { UserGateway, UserGatewaySymbols } from './user.gateway.ts';

import { CreateUserDto } from './dto/create-user.dto.ts';
import { UpdateUserDto } from './dto/update-user.dto.ts';

export const UserServiceSymbol = Symbol.for('UserService');

@injectable()
export class UserService {
  constructor(@inject(UserGatewaySymbols) private readonly userGateway: UserGateway) {}

  getAll() {
    return this.userGateway.getAll();
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
