import { injectable, inject } from 'inversify';

import { AuthService, AuthServiceSymbol } from '../service/auth.service.ts';

export const SignOutUserCaseSymbol = Symbol.for('SignOutCase');

@injectable()
export class SignOutCase {
  constructor(@inject(AuthServiceSymbol) private readonly authService: AuthService) {}

  async execute() {
    await this.authService.signOut();
  }
}
