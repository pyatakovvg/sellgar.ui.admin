import { ContainerModule } from 'inversify';

import { FileStore } from './store/file/file.store.ts';
import { FileStoreInterface } from './store/file/file-store.interface.ts';

import { FolderStore } from './store/folder/folder.store.ts';
import { FolderStoreInterface } from './store/folder/folder-store.interface.ts';

import { UploadStore } from './store/upload/upload.store.ts';
import { UploadStoreInterface } from './store/upload/upload-store.interface.ts';

import { FilesPresenter, FilesPresenterSymbol } from './presenter/files.presenter.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind<FileStoreInterface>(FileStoreInterface).to(FileStore);
  container.bind<FolderStoreInterface>(FolderStoreInterface).to(FolderStore);
  container.bind<UploadStoreInterface>(UploadStoreInterface).to(UploadStore);

  container.bind<FilesPresenter>(FilesPresenterSymbol).to(FilesPresenter);
});
