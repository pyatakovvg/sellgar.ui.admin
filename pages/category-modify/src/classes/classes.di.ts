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

import { FormStore, FormStoreSymbol } from './store/form.store.ts';
import { CategoryStore, CategoryStoreSymbol } from './store/category.store.ts';

import { CategoryPresenter, CategoryPresenterSymbol } from './presenter/category.presenter.ts';

let container: Container;

const create = () => {
  container = new Container();

  container.bind<ConfigInterface>(ConfigInterface).to(Config);
  container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

  container.bind<CategoryGateway>(CategoryGatewayInterface).to(CategoryGateway);
  container.bind<CategoryService>(CategoryServiceInterface).to(CategoryService);

  container.bind<FormStore>(FormStoreSymbol).to(FormStore);
  container.bind<CategoryStore>(CategoryStoreSymbol).to(CategoryStore);

  container.bind<CategoryPresenter>(CategoryPresenterSymbol).to(CategoryPresenter);

  return container;
};

const destroy = () => {
  container.unbindAll();
};

export { create, destroy };
