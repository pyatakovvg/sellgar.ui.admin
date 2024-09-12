import {
  HttpClient,
  HttpClientSymbol,
  ProfileService,
  ProfileServiceSymbol,
  ProfileGateway,
  ProfileGatewaySymbols,
} from '@library/domain';

import { Container } from 'inversify';

import { ApplicationPresenter, ApplicationPresenterSymbol } from './presenter/application.presenter.ts';
import { ProfileStore, ProfileStoreSymbol } from './store/profile.store.ts';
import { ApplicationStore, ApplicationStoreSymbol } from './store/application.store.ts';

import { GetUserCase, GetUserCaseSymbol } from './case/get-user.case.ts';
import { SignInCase, SignInUserCaseSymbol } from './case/sign-in.case.ts';
import { SignOutCase, SignOutUserCaseSymbol } from './case/sign-out.case.ts';

import { AuthService, AuthServiceSymbol } from './service/auth.service.ts';
import { AuthGateway, AuthGatewaySymbol } from './gateway/auth.gateway.ts';

const container = new Container();

container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<ApplicationPresenter>(ApplicationPresenterSymbol).to(ApplicationPresenter);

container.bind<ProfileStore>(ProfileStoreSymbol).to(ProfileStore);
container.bind<ApplicationStore>(ApplicationStoreSymbol).to(ApplicationStore);

container.bind<GetUserCase>(GetUserCaseSymbol).to(GetUserCase);
container.bind<SignInCase>(SignInUserCaseSymbol).to(SignInCase);
container.bind<SignOutCase>(SignOutUserCaseSymbol).to(SignOutCase);

container.bind<AuthService>(AuthServiceSymbol).to(AuthService);
container.bind<AuthGateway>(AuthGatewaySymbol).to(AuthGateway);

container.bind<ProfileService>(ProfileServiceSymbol).to(ProfileService);
container.bind<ProfileGateway>(ProfileGatewaySymbols).to(ProfileGateway);

export { container };
