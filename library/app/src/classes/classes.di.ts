import {
  Config,
  ConfigInterface,
  HttpClient,
  HttpClientInterface,
  ProfileService,
  ProfileServiceInterface,
  ProfileGateway,
  ProfileGatewayInterface,
} from '@library/domain';

import { Container } from 'inversify';

import { ProfileStore, ProfileStoreSymbol } from './stores/profile.store.ts';
import { ApplicationStore, ApplicationStoreSymbol } from './stores/application.store.ts';

import { ApplicationPresenter, ApplicationPresenterSymbol } from './presenters/application.presenter.ts';

const container = new Container();

container.bind<ConfigInterface>(ConfigInterface).to(Config);
container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

container.bind<ApplicationPresenter>(ApplicationPresenterSymbol).to(ApplicationPresenter);

container.bind<ProfileStore>(ProfileStoreSymbol).to(ProfileStore);
container.bind<ApplicationStore>(ApplicationStoreSymbol).to(ApplicationStore);

container.bind<ProfileServiceInterface>(ProfileServiceInterface).to(ProfileService);
container.bind<ProfileGatewayInterface>(ProfileGatewayInterface).to(ProfileGateway);

export { container };
