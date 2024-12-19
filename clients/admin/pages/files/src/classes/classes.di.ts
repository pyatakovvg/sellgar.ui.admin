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

import { FilesStore, FilesStoreSymbol } from './store/files.store.ts';
import { FindAllUseCase, FindAllUseCaseSymbol } from './usecase/find-all.usecase.ts';
import { FilesPresenter, FilesPresenterSymbol } from './presenter/files.presenter.ts';

const container = new Container({ defaultScope: 'Singleton' });

container.bind<ConfigInterface>(ConfigInterface).to(Config);
container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

container.bind<FolderGatewayInterface>(FolderGatewayInterface).to(FolderGateway);
container.bind<FolderServiceInterface>(FolderServiceInterface).to(FolderService);

container.bind<FileGatewayInterface>(FileGatewayInterface).to(FileGateway);
container.bind<FileServiceInterface>(FileServiceInterface).to(FileService);

container.bind<FilesStore>(FilesStoreSymbol).to(FilesStore);

container.bind<FindAllUseCase>(FindAllUseCaseSymbol).to(FindAllUseCase);

container.bind<FilesPresenter>(FilesPresenterSymbol).to(FilesPresenter);

export { container };
