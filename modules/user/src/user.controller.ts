import { Controller } from '@library/app';

import { makeObservable, observable, action } from 'mobx';

import { UserService } from './user.service.ts';

interface IRole {
  code: string;
  displayName: string;
  permissions: any[];
}

interface IPerson {
  uuid?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: Date;
  sex: 'MALE' | 'FEMALE';
}

export interface IUser extends Object {
  uuid?: string;
  email: string;
  isBlocked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  roles: IRole[];
  claims: string[];
  person: IPerson;
}

const initialUser: IUser = {
  email: '',
  isBlocked: false,
  roles: [],
  claims: [],
  person: {
    firstName: '',
    middleName: '',
    lastName: '',
    birthday: new Date(),
    sex: 'MALE',
  },
};

@Controller()
export class UserController {
  @observable user: IUser = initialUser;
  @observable roles: any[] = [];

  @observable isLoadingProcess = false;
  @observable isUpsertProcess = false;

  private readonly userService: UserService = new UserService();

  constructor() {
    makeObservable(this);
  }

  @action.bound
  async getData(uuid?: string) {
    this.isLoadingProcess = true;

    this.roles = await this.userService.getRoles();
    if (uuid) {
      this.user = await this.userService.getData(uuid);
    }

    this.isLoadingProcess = false;
  }

  async updateUser(body: IUser) {
    return await this.userService.updateUser(body);
  }

  async createUser(body: IUser) {
    return await this.userService.createUser(body);
  }

  async save(data: IUser) {
    this.isUpsertProcess = true;
    if (data.uuid) {
      this.user = await this.updateUser(data);
    } else {
      this.user = await this.createUser(data);
    }
    this.isUpsertProcess = false;
  }
}
