import { FileEntity, FileServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { observable, makeObservable, action } from 'mobx';

import { FileStoreInterface } from './file-store.interface.ts';

@injectable()
export class FileStore implements FileStoreInterface {
  @observable data: FileEntity[] = [];

  constructor(@inject(FileServiceInterface) private readonly fileService: FileServiceInterface) {
    makeObservable(this);
  }

  @action.bound
  setData(data: FileEntity[]) {
    this.data = data;
  }

  @action.bound
  addData(data: FileEntity[]) {
    this.data = [...data, ...this.data];
  }

  async execute(filter: any) {
    try {
      const result = await this.fileService.findAll(filter);

      this.setData(result.data);
    } catch (error) {}
  }
}
