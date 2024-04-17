import { inject, injectable } from 'inversify';

import { RoleGateway, RoleGatewaySymbols } from './role.gateway.ts';

export const RoleServiceSymbol = Symbol.for('RoleService');

@injectable()
export class RoleService {
  constructor(@inject(RoleGatewaySymbols) private readonly roleGateway: RoleGateway) {}

  async getAll() {
    return await this.roleGateway.getAll();
  }
}
