import { inject, injectable } from 'inversify';

import { ConfigInterface } from '../../../helpers/Config';
import { HttpClientInterface } from '../../../helpers/HttpClient';

import { type AuthGatewayInterface } from './auth-gateway.interface.ts';

@injectable()
export class AuthGateway implements AuthGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async signIn(email: string, password: string): Promise<void> {
    await this.httpClient.post(this.config.get('GATEWAY_API') + '/v1/auth/sign-in', {
      email,
      password,
    });
  }
}
