import { injectable, inject } from 'inversify';

import { AuthService, AuthServiceSymbol } from '../service/auth.service.ts';

export const GetUserCaseSymbol = Symbol.for('GetUserCase');

@injectable()
export class GetUserCase {
  constructor(@inject(AuthServiceSymbol) private readonly authService: AuthService) {}

  execute() {
    return this.authService.getUserByCookie();
  }
}
