import { Controller } from '@library/app';

import { makeObservable, observable, action } from 'mobx';

import { UsersService } from './users.service';

@Controller()
export class UsersController {
  @observable users: { data: any[]; meta: { totalRows: number } } = { data: [], meta: { totalRows: 0 } };

  private readonly userService: UsersService = new UsersService();

  constructor() {
    makeObservable(this);
  }

  @action.bound
  async getData() {
    this.users = await this.userService.getData();
  }
}
