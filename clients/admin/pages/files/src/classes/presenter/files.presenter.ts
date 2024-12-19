import { inject, injectable } from 'inversify';

import { FilesStore, FilesStoreSymbol } from '../store/files.store.ts';
import { FindAllUseCase, FindAllUseCaseSymbol } from '../usecase/find-all.usecase.ts';

export const FilesPresenterSymbol = Symbol.for('FilesPresenter');

@injectable()
export class FilesPresenter {
  constructor(
    @inject(FilesStoreSymbol) private readonly filesStore: FilesStore,
    @inject(FindAllUseCaseSymbol) private readonly findAllUseCase: FindAllUseCase,
  ) {}

  getCurrentFolderData() {
    return this.filesStore.currentFolder;
  }

  getFoldersData() {
    return this.filesStore.dataFolders;
  }

  getFileData() {
    return this.filesStore.dataFiles;
  }

  getInProcess() {
    return this.filesStore.inProcess;
  }

  async findAll(filter: any) {
    return await this.findAllUseCase.execute(filter);
  }
}
