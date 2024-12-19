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

import { CategoryStore, CategoryStoreSymbol } from './store/category.store.ts';
import { FindAllCategoryUseCase, FindAllCategoryUseCaseSymbol } from './usecase/find-all-category.usecase.ts';
import { CategoryPresenter, CategoryPresenterSymbol } from './presenter/category.presenter.ts';

const container = new Container();

container.bind<ConfigInterface>(ConfigInterface).to(Config);
container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

container.bind<CategoryGatewayInterface>(CategoryGatewayInterface).to(CategoryGateway);
container.bind<CategoryServiceInterface>(CategoryServiceInterface).to(CategoryService);

container.bind<CategoryStore>(CategoryStoreSymbol).to(CategoryStore).inSingletonScope();

container.bind<FindAllCategoryUseCase>(FindAllCategoryUseCaseSymbol).to(FindAllCategoryUseCase);

container.bind<CategoryPresenter>(CategoryPresenterSymbol).to(CategoryPresenter);

export { container };
