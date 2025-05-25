import {
  Config,
  ConfigInterface,
  HttpClient,
  HttpClientInterface,
  StoreGateway,
  StoreGatewayInterface,
  StoreService,
  StoreServiceInterface,
} from '@library/domain';

import { Container } from 'inversify';

import { ProductsStore } from './store/products.store.ts';
import { ProductsStoreInterface } from './store/products-store.interface.ts';
import { StoreController } from './controller/store.controller.ts';
import { StoreControllerInterface } from './controller/store-controller.interface.ts';

let container: Container;

const create = () => {
  container = new Container();

  container.bind<ConfigInterface>(ConfigInterface).to(Config);
  container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

  container.bind<StoreGatewayInterface>(StoreGatewayInterface).to(StoreGateway);
  container.bind<StoreServiceInterface>(StoreServiceInterface).to(StoreService);

  container.bind<ProductsStoreInterface>(ProductsStoreInterface).to(ProductsStore).inSingletonScope();

  container.bind<StoreControllerInterface>(StoreControllerInterface).to(StoreController);

  return container;
};

const destroy = () => container.unbindAll();

export { create, destroy };
