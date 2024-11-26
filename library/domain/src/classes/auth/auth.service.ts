import { inject, injectable } from 'inversify';

import { AuthGateway, AuthGatewaySymbol } from './auth.gateway.ts';

export const AuthServiceSymbol = Symbol.for('AuthService');

@injectable()
export class AuthService {
  constructor(@inject(AuthGatewaySymbol) private readonly authGateway: AuthGateway) {}

  signIn(email: string, password: string) {
    return this.authGateway.signIn(email, password);
  }
}
