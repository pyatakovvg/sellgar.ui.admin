import { MetaEntity, FileEntity, FolderEntity } from '@library/domain';

import { injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const FilesStoreSymbol = Symbol.for('FilesStore');

@injectable()
export class FilesStore {
  @observable inProcess: boolean = false;
  @observable currentFolder: FolderEntity;
  @observable dataFolders: FolderEntity[] = [];
  @observable metaFolders: MetaEntity;
  @observable dataFiles: FileEntity[] = [];
  @observable metaFiles: MetaEntity;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setCurrentFolder(data: FolderEntity) {
    this.currentFolder = data;
  }

  @action.bound
  setDataFolders(data: FolderEntity[]) {
    this.dataFolders = data;
  }

  @action.bound
  setMetaFolders(meta: MetaEntity) {
    this.metaFolders = meta;
  }

  @action.bound
  setDataFiles(data: FileEntity[]) {
    this.dataFiles = data;
  }

  @action.bound
  setMetaFiles(meta: MetaEntity) {
    this.metaFiles = meta;
  }

  @action.bound
  setProcess(state: boolean) {
    this.inProcess = state;
  }
}
