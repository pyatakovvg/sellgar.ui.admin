import {
  Config,
  ConfigSymbol,
  HttpClient,
  HttpClientSymbol,
  AuthGateway,
  AuthGatewaySymbol,
  AuthService,
  AuthServiceSymbol,
} from '@library/domain';

import { Container } from 'inversify';

import { FormStore, FormStoreSymbol } from './store/form.store.ts';
import { SignInUseCase, SignInUseCaseSymbol } from './usecase/sign-in.usecase.ts';
import { SignInPresenter, SignInPresenterSymbol } from './presenter/sign-in.presenter.ts';

const container = new Container({ defaultScope: 'Singleton' });

container.bind<Config>(ConfigSymbol).to(Config);
container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<AuthGateway>(AuthGatewaySymbol).to(AuthGateway);
container.bind<AuthService>(AuthServiceSymbol).to(AuthService);

container.bind<FormStore>(FormStoreSymbol).to(FormStore);
container.bind<SignInUseCase>(SignInUseCaseSymbol).to(SignInUseCase);
container.bind<SignInPresenter>(SignInPresenterSymbol).to(SignInPresenter);

export { container };
