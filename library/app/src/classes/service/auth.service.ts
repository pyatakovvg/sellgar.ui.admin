import { injectable, inject } from 'inversify';

import { AuthGateway, AuthGatewaySymbol } from '../gateway/auth.gateway.ts';

export const AuthServiceSymbol = Symbol.for('AuthService');

@injectable()
export class AuthService {
  constructor(@inject(AuthGatewaySymbol) private readonly authGateway: AuthGateway) {}

  signInByCredential(login: string, password: string) {
    return this.authGateway.signInByCredentials(login, password);
  }

  signOut() {
    return this.authGateway.signOut();
  }

  async getUserByCookie() {
    return await this.authGateway.getUserByCookie();
  }
}
