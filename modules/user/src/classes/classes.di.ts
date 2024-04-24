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

import { GetUserCase, GetUserCaseSymbol } from './case/get-user.case.ts';
import { UpdateUserCase, UpdateUserCaseSymbol } from './case/update-user.case.ts';
import { CreateUserCase, CreateUserCaseSymbol } from './case/create-user.case.ts';
import { GetOptionsCase, GetOptionsCaseSymbol } from './case/get-options.case.ts';

import { UserPresenter, UserPresenterSymbol } from './presenter/user.presenter.ts';

const container = new Container();

container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<RoleGateway>(RoleGatewaySymbols).to(RoleGateway);
container.bind<UserGateway>(UserGatewaySymbols).to(UserGateway);

container.bind<RoleService>(RoleServiceSymbol).to(RoleService);
container.bind<UserService>(UserServiceSymbol).to(UserService);

container.bind<GetUserCase>(GetUserCaseSymbol).to(GetUserCase);
container.bind<UpdateUserCase>(UpdateUserCaseSymbol).to(UpdateUserCase);
container.bind<CreateUserCase>(CreateUserCaseSymbol).to(CreateUserCase);
container.bind<GetOptionsCase>(GetOptionsCaseSymbol).to(GetOptionsCase);

container.bind<UserPresenter>(UserPresenterSymbol).to(UserPresenter);

export { container };
