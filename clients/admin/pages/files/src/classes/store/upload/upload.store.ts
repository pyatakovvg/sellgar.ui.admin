import { FileServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { UploadStoreInterface } from './upload-store.interface.ts';

@injectable()
export class UploadStore implements UploadStoreInterface {
  @observable inProcess: boolean = false;

  constructor(@inject(FileServiceInterface) private readonly fileService: FileServiceInterface) {
    makeObservable(this);
  }

  @action.bound
  setProcess(state: boolean) {
    this.inProcess = state;
  }

  upload(data: any, folderUuid?: string) {
    return this.fileService.upload(data, folderUuid);
  }
}
