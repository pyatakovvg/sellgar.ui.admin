import { injectable } from 'inversify';
import { observable, action, makeObservable } from 'mobx';

export const ApplicationStoreSymbol = Symbol.for('ApplicationStore');

@injectable()
export class ApplicationStore {
  @observable initialized = false;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setInitialize(state: boolean) {
    this.initialized = state;
  }
}
