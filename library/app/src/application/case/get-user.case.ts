import { injectable, inject } from 'inversify';

import { UserService, UserServiceSymbol } from '../service/user.service';

export const GetUserCaseSymbol = Symbol.for('GetUserCase');

@injectable()
export class GetUserCase {
  constructor(@inject(UserServiceSymbol) private readonly userService: UserService) {}

  execute() {
    return this.userService.getUserByCookie();
  }
}
