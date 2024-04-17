import { inject, injectable } from 'inversify';

import { UserGateway, UserGatewaySymbols } from './user.gateway.ts';

export const UserServiceSymbol = Symbol.for('UserService');

@injectable()
export class UserService {
  constructor(@inject(UserGatewaySymbols) private readonly userGateway: UserGateway) {}

  getAll() {
    return this.userGateway.getAll();
  }

  async getByUuid(uuid: string, isFlat?: boolean): Promise<any> {
    return await this.userGateway.getByUuid(uuid, isFlat);
  }

  async update(body: any) {
    return await this.userGateway.update(body.uuid, body);
  }

  async create(body: any) {
    return await this.userGateway.create(body);
  }
}
