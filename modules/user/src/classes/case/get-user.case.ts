import { UserEntity, UserService, UserServiceSymbol } from '@library/domain';

import { inject, injectable } from 'inversify';

export const GetUserCaseSymbol = Symbol.for('GetUserCase');

@injectable()
export class GetUserCase {
  constructor(@inject(UserServiceSymbol) private readonly userService: UserService) {}

  execute(uuid: string) {
    return this.userService.getByUuid(uuid);
  }
}
