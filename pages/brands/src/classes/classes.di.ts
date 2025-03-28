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

import { BrandStore } from './store/brand.store.ts';
import { BrandStoreInterface } from './store/brand-store.interface.ts';

import { BrandController } from './controller/brand.controller.ts';
import { BrandsControllerInterface } from './controller/brand-controller.interface.ts';

let container: Container;

const create = () => {
  container = new Container();

  container.bind<ConfigInterface>(ConfigInterface).to(Config);
  container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

  container.bind<BrandGatewayInterface>(BrandGatewayInterface).to(BrandGateway);
  container.bind<BrandServiceInterface>(BrandServiceInterface).to(BrandService);

  container.bind<BrandStoreInterface>(BrandStoreInterface).to(BrandStore).inSingletonScope();

  container.bind<BrandsControllerInterface>(BrandsControllerInterface).to(BrandController);

  return container;
};

const destroy = () => {
  container.unbindAll();
};

export { create, destroy };
