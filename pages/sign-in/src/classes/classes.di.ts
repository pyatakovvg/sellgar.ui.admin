import {
  Config,
  ConfigInterface,
  HttpClient,
  HttpClientInterface,
  AuthGateway,
  AuthGatewayInterface,
  AuthService,
  AuthServiceInterface,
} from '@library/domain';

import { Container } from 'inversify';

import { FormStore } from './store/form.store.ts';
import { FormStoreInterface } from './store/form-store.interface.ts';

import { SignInPresenter } from './presenter/sign-in.presenter.ts';
import { SignInPresenterInterface } from './presenter/sign-in-presenter.interface.ts';

const container = new Container();

container.bind<ConfigInterface>(ConfigInterface).to(Config);
container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

container.bind<AuthGatewayInterface>(AuthGatewayInterface).to(AuthGateway);
container.bind<AuthServiceInterface>(AuthServiceInterface).to(AuthService);

container.bind<FormStoreInterface>(FormStoreInterface).to(FormStore);

container.bind<SignInPresenterInterface>(SignInPresenterInterface).to(SignInPresenter);

export const controller = container.get<SignInPresenterInterface>(SignInPresenterInterface);
