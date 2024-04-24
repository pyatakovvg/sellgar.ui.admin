import { CreateUserDto, UserService, UserServiceSymbol } from '@library/domain';

import { inject, injectable } from 'inversify';

export const CreateUserCaseSymbol = Symbol.for('CreateUserCase');

@injectable()
export class CreateUserCase {
  constructor(@inject(UserServiceSymbol) private readonly userService: UserService) {}

  async execute(user: CreateUserDto) {
    return await this.userService.create(user);
  }
}
