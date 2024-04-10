import { injectable, inject } from 'inversify';

import { UserService, UserServiceSymbol } from '../service/user.service';

export const SignInUserCaseSymbol = Symbol.for('SignInCase');

@injectable()
export class SignInCase {
  constructor(@inject(UserServiceSymbol) private readonly userService: UserService) {}

  async execute(login: string, password: string) {
    await this.userService.signInByCredential(login, password);
    return await this.userService.getUserByCookie();
  }
}
