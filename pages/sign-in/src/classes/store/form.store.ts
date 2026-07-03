import { AuthServiceInterface, HttpException } from '@library/domain';

import { Inject, Injectable } from '@tiyn/app';
import { makeObservable, observable, action } from 'mobx';

import { FormStoreInterface } from './form-store.interface.ts';

@Injectable()
export class FormStore implements FormStoreInterface {
  @observable inProcess: boolean = false;
  @observable error: HttpException | null = null;

  constructor(@Inject(AuthServiceInterface) private readonly authService: AuthServiceInterface) {
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
}
