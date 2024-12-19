import {
  Config,
  ConfigInterface,
  HttpClient,
  HttpClientInterface,
  PropertyGroupGateway,
  PropertyGroupGatewayInterface,
  PropertyGroupService,
  PropertyGroupServiceInterface,
} from '@library/domain';

import { Container } from 'inversify';

import { FormStore, FormStoreSymbol } from './store/form.store.ts';
import { PropertyGroupStore, PropertyGroupStoreSymbol } from './store/property-group.store.ts';

import { PropertyGroupPresenter, PropertyGroupPresenterSymbol } from './presenter/property-group.presenter.ts';

export const createContainer = () => {
  const container = new Container({ defaultScope: 'Singleton' });

  container.bind<ConfigInterface>(ConfigInterface).to(Config);
  container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

  container.bind<PropertyGroupGatewayInterface>(PropertyGroupGatewayInterface).to(PropertyGroupGateway);
  container.bind<PropertyGroupServiceInterface>(PropertyGroupServiceInterface).to(PropertyGroupService);

  container.bind<FormStore>(FormStoreSymbol).to(FormStore);
  container.bind<PropertyGroupStore>(PropertyGroupStoreSymbol).to(PropertyGroupStore);

  container.bind<PropertyGroupPresenter>(PropertyGroupPresenterSymbol).to(PropertyGroupPresenter);

  return container;
};
