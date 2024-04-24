import { HttpClient, HttpClientSymbol } from '@library/domain';

import { Container } from 'inversify';

import { ProfilePresenter, ProfilePresenterSymbol } from './presenter/profile.presenter.ts';
import { ApplicationPresenter, ApplicationPresenterSymbol } from './presenter/application.presenter.ts';

import { GetUserCase, GetUserCaseSymbol } from './case/get-user.case.ts';
import { SignInCase, SignInUserCaseSymbol } from './case/sign-in.case.ts';
import { SignOutCase, SignOutUserCaseSymbol } from './case/sign-out.case.ts';

import { AuthService, AuthServiceSymbol } from './service/auth.service.ts';

import { AuthGateway, AuthGatewaySymbol } from './gateway/auth.gateway.ts';

const container = new Container();

container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<ProfilePresenter>(ProfilePresenterSymbol).to(ProfilePresenter);
container.bind<ApplicationPresenter>(ApplicationPresenterSymbol).to(ApplicationPresenter);

container.bind<GetUserCase>(GetUserCaseSymbol).to(GetUserCase);
container.bind<SignInCase>(SignInUserCaseSymbol).to(SignInCase);
container.bind<SignOutCase>(SignOutUserCaseSymbol).to(SignOutCase);

container.bind<AuthService>(AuthServiceSymbol).to(AuthService);

container.bind<AuthGateway>(AuthGatewaySymbol).to(AuthGateway);

export { container };
