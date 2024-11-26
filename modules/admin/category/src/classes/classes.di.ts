import {
  Config,
  ConfigSymbol,
  HttpClient,
  HttpClientSymbol,
  CategoryGateway,
  CategoryGatewaySymbol,
  CategoryService,
  CategoryServiceSymbol,
} from '@library/domain';

import { Container } from 'inversify';

import { CategoryStore, CategoryStoreSymbol } from './store/category.store.ts';
import { CategoriesStore, CategoriesStoreSymbol } from './store/categories.store.ts';

import { CreateCategoryUseCase, CreateCategoryUseCaseSymbol } from './usecase/create-category.usecase.ts';
import { UpdateCategoryUseCase, UpdateCategoryUseCaseSymbol } from './usecase/update-category.usecase.ts';
import { FindAllCategoryUseCase, FindAllCategoryUseCaseSymbol } from './usecase/find-all-category.usecase.ts';
import { FindByUuidCategoryUseCase, FindByUuidCategoryUseCaseSymbol } from './usecase/find-by-uuid-category.usecase.ts';

import { CategoryPresenter, CategoryPresenterSymbol } from './presenter/category.presenter.ts';

export const createContainer = () => {
  const container = new Container({ defaultScope: 'Singleton' });

  container.bind<Config>(ConfigSymbol).to(Config);
  container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

  container.bind<CategoryGateway>(CategoryGatewaySymbol).to(CategoryGateway);
  container.bind<CategoryService>(CategoryServiceSymbol).to(CategoryService);

  container.bind<CategoryStore>(CategoryStoreSymbol).to(CategoryStore);
  container.bind<CategoriesStore>(CategoriesStoreSymbol).to(CategoriesStore);

  container.bind<CreateCategoryUseCase>(CreateCategoryUseCaseSymbol).to(CreateCategoryUseCase);
  container.bind<UpdateCategoryUseCase>(UpdateCategoryUseCaseSymbol).to(UpdateCategoryUseCase);
  container.bind<FindAllCategoryUseCase>(FindAllCategoryUseCaseSymbol).to(FindAllCategoryUseCase);
  container.bind<FindByUuidCategoryUseCase>(FindByUuidCategoryUseCaseSymbol).to(FindByUuidCategoryUseCase);

  container.bind<CategoryPresenter>(CategoryPresenterSymbol).to(CategoryPresenter);

  return container;
};
