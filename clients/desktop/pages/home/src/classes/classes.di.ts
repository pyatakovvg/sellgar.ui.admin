import { Container } from 'inversify';

import { HttpClient, HttpClientInterface } from '@library/domain';

import { BucketStore, BucketStoreSymbol } from './store/bucket.store.ts';
import { BucketPresenter, BucketPresenterSymbol } from './presenter/bucket.presenter.ts';

const container = new Container();

container.bind<HttpClient>(HttpClientInterface).to(HttpClient);

container.bind<BucketStore>(BucketStoreSymbol).to(BucketStore);

container.bind<BucketPresenter>(BucketPresenterSymbol).to(BucketPresenter);

export { container };
