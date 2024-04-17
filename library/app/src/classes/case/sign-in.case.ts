import { injectable, inject } from 'inversify';

import { AuthService, AuthServiceSymbol } from '../service/auth.service.ts';

export const SignInUserCaseSymbol = Symbol.for('SignInCase');

@injectable()
export class SignInCase {
  constructor(@inject(AuthServiceSymbol) private readonly authService: AuthService) {}

  async execute(login: string, password: string) {
    await this.authService.signInByCredential(login, password);
    return await this.authService.getUserByCookie();
  }
}
