import { injectable, inject } from 'inversify';

import { UserRepository, UserRepositorySymbol } from '../repository/user.repository.ts';

export const UserServiceSymbol = Symbol.for('UserService');

@injectable()
export class UserService {
  constructor(@inject(UserRepositorySymbol) private readonly userRepository: UserRepository) {}

  signInByCredential(login: string, password: string) {
    return this.userRepository.signInByCredentials(login, password);
  }

  signOut() {
    return this.userRepository.signOut();
  }

  async getUserByCookie() {
    try {
      return await this.userRepository.getUserByCookie();
    } catch (e) {
      return null;
    }
  }
}
