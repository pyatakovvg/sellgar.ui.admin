import { HttpException, FileServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { UploadStoreInterface } from './upload-store.interface.ts';

@injectable()
export class UploadStore implements UploadStoreInterface {
  @observable inProcess: boolean = false;
  @observable httpError: HttpException | null = null;

  constructor(@inject(FileServiceInterface) private readonly fileService: FileServiceInterface) {
    makeObservable(this);
  }

  @action.bound
  setProcess(state: boolean) {
    this.inProcess = state;
  }

  @action.bound
  setError(error: HttpException | null) {
    this.httpError = error;
  }

  upload(files: File[], folderUuid?: string) {
    this.setProcess(true);

    try {
      return this.fileService.upload(files, folderUuid);
    } catch (error) {
      if (error instanceof HttpException) {
        this.setError(error);
      }
      throw error;
    } finally {
      this.setProcess(false);
    }
  }
}
