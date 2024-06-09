import { injectable, inject } from 'inversify';
import { makeObservable, action } from 'mobx';

import { SignInCase, SignInUserCaseSymbol } from '../case/sign-in.case.ts';
import { SignOutCase, SignOutUserCaseSymbol } from '../case/sign-out.case.ts';

export const ApplicationStoreSymbol = Symbol.for('ApplicationStore');

@injectable()
export class ApplicationStore {
  constructor(
    @inject(SignInUserCaseSymbol) private readonly signInCase: SignInCase,
    @inject(SignOutUserCaseSymbol) private readonly signOutCase: SignOutCase,
  ) {
    makeObservable(this);
  }

  @action.bound
  async signIn(login: string, password: string) {
    await this.signInCase.execute(login, password);
  }

  @action.bound
  async signOut() {
    await this.signOutCase.execute();
  }
}
