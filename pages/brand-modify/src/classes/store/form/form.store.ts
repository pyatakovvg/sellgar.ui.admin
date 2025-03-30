import { injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { FormStoreInterface } from './form-store.interface.ts';

@injectable()
export class FormStore implements FormStoreInterface {
  @observable inProcess: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setProcess(state: boolean) {
    this.inProcess = state;
  }
}
