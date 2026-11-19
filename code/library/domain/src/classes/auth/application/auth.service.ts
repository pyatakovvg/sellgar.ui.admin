import { Inject, Injectable } from '@sellgar/app';

import { AuthGatewayInterface } from '../data/gateway/auth-gateway.interface.ts';

import { type AuthServiceInterface } from './auth-service.interface.ts';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(@Inject(AuthGatewayInterface) private readonly authGateway: AuthGatewayInterface) {}

  async signOut() {
    return await this.authGateway.signOut();
  }

  async signIn(login: string, password: string): Promise<void> {
    await this.authGateway.signIn(login, password);
  }

  issueSocketTicket() {
    return this.authGateway.issueSocketTicket();
  }
}
