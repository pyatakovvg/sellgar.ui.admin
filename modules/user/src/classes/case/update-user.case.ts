import { UpdateUserDto, UserService, UserServiceSymbol } from '@library/domain';

import { inject, injectable } from 'inversify';

export const UpdateUserCaseSymbol = Symbol.for('UpdateUserCase');

@injectable()
export class UpdateUserCase {
  constructor(@inject(UserServiceSymbol) private readonly userService: UserService) {}

  async execute(user: UpdateUserDto) {
    return await this.userService.update(user);
  }
}
