import { HttpClient, HttpClientSymbol, ProfileService, ProfileServiceSymbol } from '@library/domain';

import { injectable, inject } from 'inversify';

export const AuthGatewaySymbol = Symbol.for('AuthGateway');

@injectable()
export class AuthGateway {
  constructor(
    @inject(HttpClientSymbol) private readonly httpClient: HttpClient,
    @inject(ProfileServiceSymbol) private readonly profileService: ProfileService,
  ) {}

  signOut() {
    return this.httpClient.post(import.meta.env.VITE_GATEWAY_API + '/v1/auth/sign-out');
  }

  signInByCredentials(login: string, password: string) {
    return this.httpClient.post(import.meta.env.VITE_GATEWAY_API + '/v1/auth/sign-in', {
      email: login.trim(),
      password: password.trim(),
    });
  }

  async getUserByCookie() {
    return await this.profileService.get();
  }
}
