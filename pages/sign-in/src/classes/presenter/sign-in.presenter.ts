import { inject, injectable } from 'inversify';

import { SignInPresenterInterface } from './sign-in-presenter.interface.ts';

import { FormStoreInterface } from '../store/form-store.interface.ts';

@injectable()
export class SignInPresenter implements SignInPresenterInterface {
  constructor(@inject(FormStoreInterface) private readonly formStore: FormStoreInterface) {}

  get formInProcess() {
    return this.formStore.inProcess;
  }

  async signIn(login: string, password: string) {
    return await this.formStore.execute(login, password);
  }
}
