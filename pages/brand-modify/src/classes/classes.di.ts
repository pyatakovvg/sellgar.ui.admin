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

import { FormStore } from './store/form/form.store.ts';
import { FormStoreInterface } from './store/form/form-store.interface.ts';
import { BrandStore } from './store/brand/brand.store.ts';
import { BrandStoreInterface } from './store/brand/brand-store.interface.ts';

import { BrandController } from './controller/brand.controller.ts';
import { BrandControllerInterface } from './controller/brand-controller.interface.ts';

let container: Container;

const create = () => {
  container = new Container();

  container.bind<ConfigInterface>(ConfigInterface).to(Config);
  container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

  container.bind<BrandGatewayInterface>(BrandGatewayInterface).to(BrandGateway);
  container.bind<BrandServiceInterface>(BrandServiceInterface).to(BrandService);

  container.bind<FormStoreInterface>(FormStoreInterface).to(FormStore);
  container.bind<BrandStoreInterface>(BrandStoreInterface).to(BrandStore);

  container.bind<BrandControllerInterface>(BrandControllerInterface).to(BrandController);

  return container;
};

const destroy = () => {
  container.unbindAll();
};

export { create, destroy };
