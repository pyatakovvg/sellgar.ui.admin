import { injectable, inject } from 'inversify';

import { UserService, UserServiceSymbol } from '../service/user.service';

export const SignOutUserCaseSymbol = Symbol.for('SignOutCase');

@injectable()
export class SignOutCase {
  constructor(@inject(UserServiceSymbol) private readonly userService: UserService) {}

  async execute() {
    await this.userService.signOut();
  }
}
