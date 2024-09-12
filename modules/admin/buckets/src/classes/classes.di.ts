import { Container } from 'inversify';

import {
  HttpClient,
  HttpClientSymbol,
  BucketGateway,
  BucketGatewaySymbols,
  BucketService,
  BucketServiceSymbol,
} from '@library/domain';

import { BucketStore, BucketStoreSymbol } from './store/bucket.store.ts';
import { BucketPresenter, BucketPresenterSymbol } from './presenter/bucket.presenter.ts';

const container = new Container();

container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<BucketGateway>(BucketGatewaySymbols).to(BucketGateway);

container.bind<BucketService>(BucketServiceSymbol).to(BucketService);

container.bind<BucketStore>(BucketStoreSymbol).to(BucketStore);

container.bind<BucketPresenter>(BucketPresenterSymbol).to(BucketPresenter);

export { container };
