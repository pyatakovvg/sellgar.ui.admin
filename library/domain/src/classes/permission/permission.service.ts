import { inject, injectable } from 'inversify';

import { PermissionGateway, PermissionGatewaySymbols } from './permission.gateway.ts';

export const PermissionServiceSymbol = Symbol.for('PermissionService');

@injectable()
export class PermissionService {
  constructor(@inject(PermissionGatewaySymbols) private readonly permissionGateway: PermissionGateway) {}

  async getAll() {
    return await this.permissionGateway.getAll();
  }
}
