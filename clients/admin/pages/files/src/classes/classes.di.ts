import {
  Config,
  ConfigInterface,
  HttpClient,
  HttpClientInterface,
  FolderGateway,
  FolderGatewayInterface,
  FolderService,
  FolderServiceInterface,
  FileGateway,
  FileGatewayInterface,
  FileService,
  FileServiceInterface,
} from '@library/domain';

import { Container } from 'inversify';

import { FileStore } from './store/file/file.store.ts';
import { FileStoreInterface } from './store/file/file-store.interface.ts';

import { FolderStore } from './store/folder/folder.store.ts';
import { FolderStoreInterface } from './store/folder/folder-store.interface.ts';

import { UploadStore } from './store/upload/upload.store.ts';
import { UploadStoreInterface } from './store/upload/upload-store.interface.ts';

import { FilesPresenter, FilesPresenterSymbol } from './presenter/files.presenter.ts';

const container = new Container({ defaultScope: 'Singleton' });

container.bind<ConfigInterface>(ConfigInterface).to(Config);
container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

container.bind<FolderGatewayInterface>(FolderGatewayInterface).to(FolderGateway);
container.bind<FolderServiceInterface>(FolderServiceInterface).to(FolderService);

container.bind<FileGatewayInterface>(FileGatewayInterface).to(FileGateway);
container.bind<FileServiceInterface>(FileServiceInterface).to(FileService);

container.bind<FileStoreInterface>(FileStoreInterface).to(FileStore);
container.bind<FolderStoreInterface>(FolderStoreInterface).to(FolderStore);
container.bind<UploadStoreInterface>(UploadStoreInterface).to(UploadStore);

container.bind<FilesPresenter>(FilesPresenterSymbol).to(FilesPresenter);

export { container };
