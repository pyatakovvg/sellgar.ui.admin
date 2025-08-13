import { inject, injectable } from 'inversify';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';

import { type AuthGatewayInterface } from './auth-gateway.interface.ts';

@injectable()
export class AuthGateway implements AuthGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async signIn(login: string, password: string) {
    await this.httpClient.post(this.config.get('GATEWAY_API') + '/v1/auth/sign-in', {
      login,
      password,
    });
  }

  async signOut() {
    await this.httpClient.post(this.config.get('GATEWAY_API') + '/v1/auth/sign-out');
  }
}
