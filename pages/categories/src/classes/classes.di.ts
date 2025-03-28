import {
  Config,
  ConfigInterface,
  HttpClient,
  HttpClientInterface,
  CategoryGateway,
  CategoryGatewayInterface,
  CategoryService,
  CategoryServiceInterface,
} from '@library/domain';

import { Container } from 'inversify';

import { CategoryStore } from './store/category.store.ts';
import { CategoryStoreInterface } from './store/category-store.interface.ts';

import { CategoryController } from './controller/category.controller.ts';
import { CategoryControllerInterface } from './controller/category-controller.interface.ts';

let container: Container;

export const create = () => {
  container = new Container();

  container.bind<ConfigInterface>(ConfigInterface).to(Config);
  container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

  container.bind<CategoryGatewayInterface>(CategoryGatewayInterface).to(CategoryGateway);
  container.bind<CategoryServiceInterface>(CategoryServiceInterface).to(CategoryService);

  container.bind<CategoryStoreInterface>(CategoryStoreInterface).to(CategoryStore).inSingletonScope();

  container.bind<CategoryControllerInterface>(CategoryControllerInterface).to(CategoryController);

  return container;
};

export const destroy = () => {
  container.unbindAll();
};
