import {
  Config,
  ConfigInterface,
  HttpClient,
  HttpClientInterface,
  BrandGateway,
  BrandGatewayInterface,
  BrandService,
  BrandServiceInterface,
} from '@library/domain';

import { Container } from 'inversify';

import { FormStore, FormStoreSymbol } from './store/form.store.ts';
import { BrandStore, BrandStoreSymbol } from './store/brand.store.ts';

import { BrandPresenter, BrandPresenterSymbol } from './presenter/brand.presenter.ts';

let container: Container;

const create = () => {
  container = new Container();

  container.bind<ConfigInterface>(ConfigInterface).to(Config);
  container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

  container.bind<BrandGatewayInterface>(BrandGatewayInterface).to(BrandGateway);
  container.bind<BrandServiceInterface>(BrandServiceInterface).to(BrandService);

  container.bind<FormStore>(FormStoreSymbol).to(FormStore);
  container.bind<BrandStore>(BrandStoreSymbol).to(BrandStore);

  container.bind<BrandPresenter>(BrandPresenterSymbol).to(BrandPresenter);

  return container;
};

const destroy = () => {
  container.unbindAll();
};

export { create, destroy };
