import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { CreateUserDto, UpdateUserDto, RoleEntity, UserEntity } from '@library/domain';

import { GetUserCase, GetUserCaseSymbol } from '../case/get-user.case.ts';
import { CreateUserCase, CreateUserCaseSymbol } from '../case/create-user.case.ts';
import { UpdateUserCase, UpdateUserCaseSymbol } from '../case/update-user.case.ts';
import { GetOptionsCase, GetOptionsCaseSymbol } from '../case/get-options.case.ts';

export const UserPresenterSymbol = Symbol.for('UserPresenter');

const defaultUser: UserEntity = {
  uuid: '',
  email: '',
  person: {
    uuid: '',
    firstName: '',
    middleName: '',
    lastName: '',
    sex: 'MALE',
    birthday: '',
  },
  isBlocked: false,
  roles: [],
  createdAt: '',
  updatedAt: '',
};

@injectable()
export class UserPresenter {
  @observable roles: RoleEntity[] = [];
  @observable user: UserEntity = defaultUser;

  @observable isLoading: boolean = true;
  @observable isProcess: boolean = false;

  constructor(
    @inject(GetUserCaseSymbol) private readonly getUserCase: GetUserCase,
    @inject(UpdateUserCaseSymbol) private readonly updateUserCase: UpdateUserCase,
    @inject(CreateUserCaseSymbol) private readonly createUserCase: CreateUserCase,
    @inject(GetOptionsCaseSymbol) private readonly getOptionsCase: GetOptionsCase,
  ) {
    makeObservable(this);
  }

  @action
  private setLoading(state: boolean) {
    this.isLoading = state;
  }

  @action
  private setProcess(state: boolean) {
    this.isProcess = state;
  }

  @action
  private setRoles(roles: RoleEntity[]) {
    this.roles = roles;
  }

  @action
  private setUser(user: UserEntity) {
    this.user = user;
  }

  @action.bound
  async getUserByUuid(uuid?: string) {
    this.setLoading(true);

    const options = await this.getOptionsCase.execute();

    this.setRoles(options.roles);

    if (uuid) {
      this.setUser(await this.getUserCase.execute(uuid));
    }

    this.setLoading(false);
  }

  @action.bound
  async updateUser(user: UpdateUserDto) {
    this.setProcess(true);

    this.setUser(await this.updateUserCase.execute(user));

    this.setProcess(false);
  }

  @action.bound
  async createUser(user: CreateUserDto) {
    this.setProcess(true);

    await this.createUserCase.execute(user);

    this.setProcess(false);
  }
}
