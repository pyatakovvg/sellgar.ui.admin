import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { FileStore, FileStoreSymbol } from '@/classes/store/file.store.ts';
import { BucketStore, BucketStoreSymbol } from '@/classes/store/bucket.store.ts';

export const FilePresenterSymbol = Symbol.for('FilePresenter');

@injectable()
export class FilePresenter {
  @observable inProcess: boolean = true;

  constructor(
    @inject(FileStoreSymbol) readonly fileStore: FileStore,
    @inject(BucketStoreSymbol) readonly bucketStore: BucketStore,
  ) {
    makeObservable(this);
  }

  @action.bound
  private setProcess(process: boolean) {
    this.inProcess = process;
  }

  @action.bound
  async getData(bucketName: string) {
    this.setProcess(true);

    const bucket = await this.bucketStore.getByUuid(bucketName);

    await this.fileStore.getAll(bucket.bucketName);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.setProcess(false);
  }

  @action.bound
  async remove(bucketName: string, fileName: string) {
    await this.fileStore.remove(bucketName, fileName);
  }
}
