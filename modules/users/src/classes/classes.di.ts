import { Container } from 'inversify';

import {
  HttpClient,
  HttpClientSymbol,
  UserGateway,
  UserGatewaySymbols,
  UserService,
  UserServiceSymbol,
} from '@library/domain';

import { UserPresenter, UserPresenterSymbol } from './presenter/user.presenter.ts';

const container = new Container();

container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<UserGateway>(UserGatewaySymbols).to(UserGateway);

container.bind<UserService>(UserServiceSymbol).to(UserService);

container.bind<UserPresenter>(UserPresenterSymbol).to(UserPresenter);

export { container };
