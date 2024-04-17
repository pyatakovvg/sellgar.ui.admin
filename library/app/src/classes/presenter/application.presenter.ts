import { injectable, inject } from 'inversify';
import { makeObservable, action, observable } from 'mobx';

import { SignInCase, SignInUserCaseSymbol } from '../case/sign-in.case.ts';
import { SignOutCase, SignOutUserCaseSymbol } from '../case/sign-out.case.ts';

export const ApplicationPresenterSymbol = Symbol.for('ApplicationPresenter');

@injectable()
export class ApplicationPresenter {
  constructor(
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
    return await this.signInCase.execute(login, password);
  }

  @action.bound
  async signOut() {
    await this.signOutCase.execute();
  }
}
