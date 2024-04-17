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
} from '@library/infra';

import { Container } from 'inversify';

import { UserPresenter, UserPresenterSymbol } from './presenter/user.presenter.ts';

const container = new Container();

container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<RoleGateway>(RoleGatewaySymbols).to(RoleGateway);
container.bind<UserGateway>(UserGatewaySymbols).to(UserGateway);

container.bind<RoleService>(RoleServiceSymbol).to(RoleService);
container.bind<UserService>(UserServiceSymbol).to(UserService);

container.bind<UserPresenter>(UserPresenterSymbol).to(UserPresenter);

export { container };
