import { HttpClient, HttpClientSymbol } from '@library/domain';

import { injectable, inject } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { ProfileEntity } from './entity/profile.entity.ts';

export const AuthGatewaySymbol = Symbol.for('AuthGateway');

@injectable()
export class AuthGateway {
  constructor(@inject(HttpClientSymbol) private readonly httpClient: HttpClient) {}

  signOut() {
    return this.httpClient.post(import.meta.env.VITE_GATEWAY_API + '/auth/logout');
  }

  signInByCredentials(login: string, password: string) {
    return this.httpClient.post(import.meta.env.VITE_GATEWAY_API + '/auth/login', {
      email: login.trim(),
      password: password.trim(),
    });
  }

  async getUserByCookie() {
    const result = await this.httpClient.get(import.meta.env.VITE_GATEWAY_API + '/auth/profile');
    const resultInstance = plainToInstance(ProfileEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
