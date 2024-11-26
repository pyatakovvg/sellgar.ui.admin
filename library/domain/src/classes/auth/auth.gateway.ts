import { inject, injectable } from 'inversify';

import { Config, ConfigSymbol } from '../../helpers/Config';
import { HttpClient, HttpClientSymbol } from '../../helpers/HttpClient';

export const AuthGatewaySymbol = Symbol.for('AuthGateway');

@injectable()
export class AuthGateway {
  constructor(
    @inject(ConfigSymbol) private readonly config: Config,
    @inject(HttpClientSymbol) private readonly httpClient: HttpClient,
  ) {}

  signIn(email: string, password: string) {
    return this.httpClient.post(this.config.get('GATEWAY_API') + '/v1/auth/sign-in', {
      email,
      password,
    });
  }
}
