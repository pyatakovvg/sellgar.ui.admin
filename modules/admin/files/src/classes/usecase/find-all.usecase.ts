import {
  GetAllFolderFilterDto,
  FolderService,
  FolderServiceSymbol,
  FileService,
  FileServiceSymbol,
} from '@library/domain';

import { inject, injectable } from 'inversify';

import { FilesStore, FilesStoreSymbol } from '../store/files.store.ts';

export const FindAllUseCaseSymbol = Symbol.for('FindAllUseCase');

@injectable()
export class FindAllUseCase {
  constructor(
    @inject(FilesStoreSymbol) private readonly filesStore: FilesStore,
    @inject(FolderServiceSymbol) private readonly folderService: FolderService,
    @inject(FileServiceSymbol) private readonly fileService: FileService,
  ) {}

  async execute(filter: GetAllFolderFilterDto) {
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
