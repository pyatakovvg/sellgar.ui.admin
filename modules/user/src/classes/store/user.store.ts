import { CreateUserDto, UpdateUserDto, UserEntity, UserService, UserServiceSymbol } from '@library/domain';

import { inject, injectable } from 'inversify';
import { action, observable, makeObservable } from 'mobx';

const defaultUser: Omit<UserEntity, 'createdAt' | 'updatedAt'> = {
  uuid: '',
  email: '',
  roles: [],
  isBlocked: false,
  person: {
    uuid: '',
    firstName: '',
    middleName: '',
    lastName: '',
    sex: 'MALE',
    birthday: '',
    fullName: '',
  },
};

export const UserStoreSymbol = Symbol.for('UserStore');

@injectable()
export class UserStore {
  @observable user: Omit<UserEntity, 'createdAt' | 'updatedAt'> = defaultUser;

  constructor(@inject(UserServiceSymbol) private readonly userService: UserService) {
    makeObservable(this);
  }

  @action.bound
  private setUser(user: Omit<UserEntity, 'createdAt' | 'updatedAt'>) {
    this.user = user;
  }

  @action.bound
  async getData(uuid: string) {
    const user = await this.userService.getByUuid(uuid);

    this.setUser(user);
  }

  @action.bound
  async createUser(userDto: CreateUserDto) {
    const newUser: Omit<UserEntity, 'createdAt' | 'updatedAt'> = await this.userService.create(userDto);

    this.setUser(newUser);
  }

  @action.bound
  async updateUser(userDto: UpdateUserDto) {
    const updatedUser: UserEntity = await this.userService.update(userDto);

    this.setUser(updatedUser);
  }
}
