import { inject, injectable } from 'inversify';

import { FileStoreInterface } from '../store/file/file-store.interface.ts';
import { FolderStoreInterface } from '../store/folder/folder-store.interface.ts';
import { UploadStoreInterface } from '../store/upload/upload-store.interface.ts';

export const FilesPresenterSymbol = Symbol.for('FilesPresenter');

@injectable()
export class FilesPresenter {
  constructor(
    @inject(FileStoreInterface) private readonly filesStore: FileStoreInterface,
    @inject(FolderStoreInterface) private readonly folderStore: FolderStoreInterface,
    @inject(UploadStoreInterface) private readonly uploadStore: UploadStoreInterface,
  ) {}

  getCurrentFolderData() {
    return this.folderStore.currentFolderData;
  }

  getFoldersData() {
    return this.folderStore.data;
  }

  getFileData() {
    return this.filesStore.data;
  }

  getInProcess() {
    return false;
  }

  async findAll(filter: any) {
    await Promise.all([
      await this.filesStore.execute({
        folderUuid: filter.parentUuid,
      }),
      await this.folderStore.execute(filter),
    ]);
  }

  async upload(data: any, folderUuid?: string) {
    const result = await this.uploadStore.upload(data, folderUuid);

    this.filesStore.addData(result);
  }
}
