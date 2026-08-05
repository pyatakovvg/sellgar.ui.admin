import { Inject, Injectable } from '@sellgar/app';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';

import { type AuthGatewayInterface } from './auth-gateway.interface.ts';

@Injectable()
export class AuthGateway implements AuthGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
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
