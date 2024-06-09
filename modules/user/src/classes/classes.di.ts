import {
  HttpClient,
  HttpClientSymbol,
  UserGateway,
  UserGatewaySymbols,
  RoleGateway,
  RoleGatewaySymbols,
  RoleService,
  RoleServiceSymbol,
  UserService,
  UserServiceSymbol,
} from '@library/domain';

import { Container } from 'inversify';

import { UserPresenter, UserPresenterSymbol } from './presenter/user.presenter.ts';

import { UserStore, UserStoreSymbol } from './store/user.store.ts';
import { FilterStore, FilterStoreSymbol } from './store/filter.store.ts';

const container = new Container();

container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<RoleGateway>(RoleGatewaySymbols).to(RoleGateway);
container.bind<UserGateway>(UserGatewaySymbols).to(UserGateway);

container.bind<RoleService>(RoleServiceSymbol).to(RoleService);
container.bind<UserService>(UserServiceSymbol).to(UserService);

container.bind<UserStore>(UserStoreSymbol).to(UserStore);
container.bind<FilterStore>(FilterStoreSymbol).to(FilterStore);

container.bind<UserPresenter>(UserPresenterSymbol).to(UserPresenter);

export { container };
