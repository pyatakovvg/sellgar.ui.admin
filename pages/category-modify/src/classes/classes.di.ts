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

import { FormStore } from './store/form/form.store.ts';
import { FormStoreInterface } from './store/form/form-store.interface.ts';

import { CategoryController } from './controller/category.controller.ts';
import { CategoryControllerInterface } from './controller/category-controller.interface.ts';

let container: Container;

const create = () => {
  container = new Container();

  container.bind<ConfigInterface>(ConfigInterface).to(Config);
  container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

  container.bind<CategoryGateway>(CategoryGatewayInterface).to(CategoryGateway);
  container.bind<CategoryService>(CategoryServiceInterface).to(CategoryService);

  container.bind<FormStoreInterface>(FormStoreInterface).to(FormStore);

  container.bind<CategoryControllerInterface>(CategoryControllerInterface).to(CategoryController);

  return container;
};

const destroy = () => {
  container.unbindAll();
};

export { create, destroy };
