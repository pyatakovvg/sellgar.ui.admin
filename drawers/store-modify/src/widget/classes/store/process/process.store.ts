import { injectable } from 'inversify';
import { observable, action, makeObservable } from 'mobx';

import { ProcessStoreInterface } from './process-store.interface.ts';

@injectable()
export class ProcessStore implements ProcessStoreInterface {
  @observable inProcess: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setProcess(state: boolean) {
    this.inProcess = state;
  }
}
