import { FileEntity, FileService, FileServiceSymbol } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const FileStoreSymbol = Symbol.for('FileStore');

@injectable()
export class FileStore {
  @observable files: FileEntity[] = [];

  constructor(@inject(FileServiceSymbol) private readonly fileService: FileService) {
    makeObservable(this);
  }

  @action.bound
  private setFiles(files: FileEntity[]) {
    this.files = files;
  }

  @action.bound
  async getAll(bucketName: string) {
    const { data, meta } = await this.fileService.getAll(bucketName);

    this.setFiles(data);
  }

  @action.bound
  async remove(bucketName: string, fileName: string) {
    await this.fileService.remove(bucketName, fileName);
  }
}
