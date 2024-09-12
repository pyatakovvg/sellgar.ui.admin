import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { BucketStore, BucketStoreSymbol } from '@/classes/store/bucket.store.ts';

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
  async getData() {
    this.setProcess(true);

    await this.bucketStore.getAll();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.setProcess(false);
  }

  @action.bound
  async remove(bucketName: string) {
    await this.bucketStore.remove(bucketName);
    await this.bucketStore.getAll();
  }
}
