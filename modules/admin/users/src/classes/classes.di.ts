import { Container } from 'inversify';

import {
  HttpClient,
  HttpClientSymbol,
  UserGateway,
  UserGatewaySymbols,
  UserService,
  UserServiceSymbol,
  RoleService,
  RoleServiceSymbol,
  RoleGateway,
  RoleGatewaySymbols,
} from '@library/domain';

import { UserStore, UserStoreSymbol } from './store/user.store.ts';
import { FilterStore, FilterStoreSymbol } from './store/filter.store.ts';
import { UserPresenter, UserPresenterSymbol } from './presenter/user.presenter.ts';

const container = new Container();

container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<UserGateway>(UserGatewaySymbols).to(UserGateway);
container.bind<RoleGateway>(RoleGatewaySymbols).to(RoleGateway);

container.bind<UserService>(UserServiceSymbol).to(UserService);
container.bind<RoleService>(RoleServiceSymbol).to(RoleService);

container.bind<UserStore>(UserStoreSymbol).to(UserStore);
container.bind<FilterStore>(FilterStoreSymbol).to(FilterStore);

container.bind<UserPresenter>(UserPresenterSymbol).to(UserPresenter);

export { container };
