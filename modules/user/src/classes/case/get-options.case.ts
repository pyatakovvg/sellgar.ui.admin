import { RoleService, RoleServiceSymbol } from '@library/domain';

import { inject, injectable } from 'inversify';

export const GetOptionsCaseSymbol = Symbol.for('GetOptionsCase');

@injectable()
export class GetOptionsCase {
  constructor(@inject(RoleServiceSymbol) private readonly roleService: RoleService) {}

  async execute() {
    const rolesResult = await this.roleService.getAll();

    return {
      roles: rolesResult.data,
    };
  }
}
