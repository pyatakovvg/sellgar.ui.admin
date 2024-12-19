import { AuthServiceInterface, HttpException } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { FormStoreInterface } from './form-store.interface.ts';

@injectable()
export class FormStore implements FormStoreInterface {
  @observable inProcess: boolean = false;
  @observable error: HttpException | null = null;

  constructor(@inject(AuthServiceInterface) private readonly authService: AuthServiceInterface) {
    makeObservable(this);
  }

  @action.bound
  setProcess(state: boolean) {
    this.inProcess = state;
  }

  @action.bound
  setError(error: HttpException | null) {
    this.error = error;
  }

  async execute(email: string, password: string) {
    this.setProcess(true);

    try {
      await this.authService.signIn(email, password);
      return true;
    } catch (error) {
      this.setError(error as HttpException);
      throw error;
    } finally {
      this.setProcess(false);
    }
  }
}
