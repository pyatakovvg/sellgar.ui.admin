import { inject, injectable } from 'inversify';

import { AuthGatewayInterface } from '../gateway/auth-gateway.interface.ts';

import { type AuthServiceInterface } from './auth-service.interface.ts';

@injectable()
export class AuthService implements AuthServiceInterface {
  constructor(@inject(AuthGatewayInterface) private readonly authGateway: AuthGatewayInterface) {}

  async signIn(login: string, password: string): Promise<void> {
    await this.authGateway.signIn(login, password);
  }
}
