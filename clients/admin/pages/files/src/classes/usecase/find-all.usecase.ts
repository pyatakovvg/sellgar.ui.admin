import { FolderServiceInterface, FileServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { FilesStore, FilesStoreSymbol } from '../store/files.store.ts';

export const FindAllUseCaseSymbol = Symbol.for('FindAllUseCase');

@injectable()
export class FindAllUseCase {
  constructor(
    @inject(FilesStoreSymbol) private readonly filesStore: FilesStore,
    @inject(FolderServiceInterface) private readonly folderService: FolderServiceInterface,
    @inject(FileServiceInterface) private readonly fileService: FileServiceInterface,
  ) {}

  async execute(filter: any) {
    this.filesStore.setProcess(true);

    try {
      const resultCurrentFolder = filter.parentUuid && (await this.folderService.findByUuid(filter.parentUuid));
      const resultFolders = await this.folderService.findAll(filter);
      const resultFiles = await this.fileService.findAll({
        folderUuid: filter.parentUuid,
      });

      this.filesStore.setDataFolders(resultFolders.data);
      this.filesStore.setMetaFolders(resultFolders.meta);
      this.filesStore.setDataFiles(resultFiles.data);
      this.filesStore.setMetaFiles(resultFiles.meta);
      this.filesStore.setCurrentFolder(resultCurrentFolder);
    } finally {
      this.filesStore.setProcess(false);
    }
  }
}
