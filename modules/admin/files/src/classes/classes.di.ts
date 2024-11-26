import {
  Config,
  ConfigSymbol,
  HttpClient,
  HttpClientSymbol,
  FolderGateway,
  FolderGatewaySymbol,
  FolderService,
  FolderServiceSymbol,
  FileGateway,
  FileGatewaySymbol,
  FileService,
  FileServiceSymbol,
} from '@library/domain';

import { Container } from 'inversify';

import { FilesStore, FilesStoreSymbol } from './store/files.store.ts';
import { FindAllUseCase, FindAllUseCaseSymbol } from './usecase/find-all.usecase.ts';
import { FilesPresenter, FilesPresenterSymbol } from './presenter/files.presenter.ts';

const container = new Container({ defaultScope: 'Singleton' });

container.bind<Config>(ConfigSymbol).to(Config);
container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<FolderGateway>(FolderGatewaySymbol).to(FolderGateway);
container.bind<FolderService>(FolderServiceSymbol).to(FolderService);

container.bind<FileGateway>(FileGatewaySymbol).to(FileGateway);
container.bind<FileService>(FileServiceSymbol).to(FileService);

container.bind<FilesStore>(FilesStoreSymbol).to(FilesStore);

container.bind<FindAllUseCase>(FindAllUseCaseSymbol).to(FindAllUseCase);

container.bind<FilesPresenter>(FilesPresenterSymbol).to(FilesPresenter);

export { container };
