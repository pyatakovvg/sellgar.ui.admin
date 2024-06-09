import {
  HttpClient,
  HttpClientSymbol,
  RoleGateway,
  RoleGatewaySymbols,
  RoleService,
  RoleServiceSymbol,
} from '@library/domain';

import { Container } from 'inversify';

import { RolePresenter, RolePresenterSymbol } from './presenter/role.presenter.ts';

const container = new Container();

container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<RoleGateway>(RoleGatewaySymbols).to(RoleGateway);

container.bind<RoleService>(RoleServiceSymbol).to(RoleService);

container.bind<RolePresenter>(RolePresenterSymbol).to(RolePresenter);

export { container };
