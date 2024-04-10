import { injectable } from 'inversify';
import { Fetch } from '../../common/Fetch.ts';

export const UserRepositorySymbol = Symbol.for('UserRepository');

@injectable()
export class UserRepository {
  private readonly _fetch = new Fetch({
    baseURL: import.meta.env.VITE_GATEWAY_API,
  });

  signOut() {
    return this._fetch.send({
      url: '/auth/logout',
      method: 'post',
      data: null,
    });
  }

  signInByCredentials(login: string, password: string) {
    return this._fetch.send({
      url: '/auth/login',
      method: 'post',
      data: {
        email: login.trim(),
        password: password.trim(),
      },
    });
  }

  getUserByCookie() {
    return this._fetch.send({
      url: '/auth/profile',
    });
  }
}
