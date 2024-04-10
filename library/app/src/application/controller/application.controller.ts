import { injectable, inject } from 'inversify';
import { makeObservable, action, observable } from 'mobx';

import { GetUserCase, GetUserCaseSymbol } from '../case/get-user.case.ts';
import { SignInCase, SignInUserCaseSymbol } from '../case/sign-in.case.ts';
import { SignOutCase, SignOutUserCaseSymbol } from '../case/sign-out.case.ts';

export const ApplicationControllerSymbol = Symbol.for('ApplicationController');

@injectable()
export class ApplicationController {
  constructor(
    @inject(GetUserCaseSymbol) private readonly getUserCase: GetUserCase,
    @inject(SignInUserCaseSymbol) private readonly signInCase: SignInCase,
    @inject(SignOutUserCaseSymbol) private readonly signOutCase: SignOutCase,
  ) {
    makeObservable(this);
  }

  @observable initialized = false;

  @action.bound
  setApplicationInitialized() {
    this.initialized = true;
  }

  @action.bound
  async signIn(login: string, password: string) {
    await this.signInCase.execute(login, password);
  }

  @action.bound
  async signOut() {
    await this.signOutCase.execute();
  }

  @action.bound
  async getUser() {
    await this.getUserCase.execute();
  }
}
