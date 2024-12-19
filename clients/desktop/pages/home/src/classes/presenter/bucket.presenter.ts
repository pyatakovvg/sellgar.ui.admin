import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { BucketStore, BucketStoreSymbol } from '../store/bucket.store.ts';

export const BucketPresenterSymbol = Symbol.for('BucketPresenter');

@injectable()
export class BucketPresenter {
  @observable inProcess: boolean = true;

  constructor(@inject(BucketStoreSymbol) readonly bucketStore: BucketStore) {
    makeObservable(this);
  }

  @action.bound
  private setProcess(process: boolean) {
    this.inProcess = process;
  }

  @action.bound
  async getData() {}

  @action.bound
  async remove() {}
}
