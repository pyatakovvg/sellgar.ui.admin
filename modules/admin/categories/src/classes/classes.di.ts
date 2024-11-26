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
import { FindAllCategoryUseCase, FindAllCategoryUseCaseSymbol } from './usecase/find-all-category.usecase.ts';
import { CategoryPresenter, CategoryPresenterSymbol } from './presenter/category.presenter.ts';

const container = new Container({ defaultScope: 'Singleton' });

container.bind<Config>(ConfigSymbol).to(Config);
container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<CategoryGateway>(CategoryGatewaySymbol).to(CategoryGateway);
container.bind<CategoryService>(CategoryServiceSymbol).to(CategoryService);

container.bind<CategoryStore>(CategoryStoreSymbol).to(CategoryStore);

container.bind<FindAllCategoryUseCase>(FindAllCategoryUseCaseSymbol).to(FindAllCategoryUseCase);

container.bind<CategoryPresenter>(CategoryPresenterSymbol).to(CategoryPresenter);

export { container };
