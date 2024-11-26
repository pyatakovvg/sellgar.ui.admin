import {
  Config,
  ConfigSymbol,
  HttpClient,
  HttpClientSymbol,
  ProfileService,
  ProfileServiceSymbol,
  ProfileGateway,
  ProfileGatewaySymbol,
} from '@library/domain';

import { Container } from 'inversify';

import { ProfileStore, ProfileStoreSymbol } from './stores/profile.store.ts';
import { ApplicationStore, ApplicationStoreSymbol } from './stores/application.store.ts';

import { ApplicationPresenter, ApplicationPresenterSymbol } from './presenters/application.presenter.ts';

const container = new Container();

container.bind<Config>(ConfigSymbol).to(Config);
container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<ApplicationPresenter>(ApplicationPresenterSymbol).to(ApplicationPresenter);

container.bind<ProfileStore>(ProfileStoreSymbol).to(ProfileStore);
container.bind<ApplicationStore>(ApplicationStoreSymbol).to(ApplicationStore);

container.bind<ProfileService>(ProfileServiceSymbol).to(ProfileService);
container.bind<ProfileGateway>(ProfileGatewaySymbol).to(ProfileGateway);

export { container };
