import {
  HttpClient,
  HttpClientSymbol,
  PermissionGateway,
  PermissionGatewaySymbols,
  PermissionService,
  PermissionServiceSymbol,
} from '@library/domain';

import { Container } from 'inversify';

import { PermissionPresenter, PermissionPresenterSymbol } from './presenter/permission.presenter.ts';

const container = new Container();

container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<PermissionGateway>(PermissionGatewaySymbols).to(PermissionGateway);

container.bind<PermissionService>(PermissionServiceSymbol).to(PermissionService);

container.bind<PermissionPresenter>(PermissionPresenterSymbol).to(PermissionPresenter);

export { container };
