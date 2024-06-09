import { Container } from 'inversify';

import {
  HttpClient,
  HttpClientSymbol,
  FileService,
  FileServiceSymbol,
  FileGateway,
  FileGatewaySymbols,
  BucketService,
  BucketServiceSymbol,
  BucketGateway,
  BucketGatewaySymbols,
} from '@library/domain';

import { FileStore, FileStoreSymbol } from './store/file.store.ts';
import { BucketStore, BucketStoreSymbol } from './store/bucket.store.ts';
import { FilePresenter, FilePresenterSymbol } from './presenter/file.presenter.ts';

const container = new Container();

container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<FileGateway>(FileGatewaySymbols).to(FileGateway);
container.bind<BucketGateway>(BucketGatewaySymbols).to(BucketGateway);

container.bind<FileService>(FileServiceSymbol).to(FileService);
container.bind<BucketService>(BucketServiceSymbol).to(BucketService);

container.bind<FileStore>(FileStoreSymbol).to(FileStore);
container.bind<BucketStore>(BucketStoreSymbol).to(BucketStore);

container.bind<FilePresenter>(FilePresenterSymbol).to(FilePresenter);

export { container };
