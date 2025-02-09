import {
  Config,
  ConfigInterface,
  HttpClient,
  HttpClientInterface,
  UnitGateway,
  UnitGatewayInterface,
  UnitService,
  UnitServiceInterface,
} from '@library/domain';

import { Container } from 'inversify';

import { FormStore, FormStoreSymbol } from './store/form.store.ts';
import { UnitStore, UnitStoreSymbol } from './store/unit.store.ts';

import { UnitPresenter, UnitPresenterSymbol } from './presenter/unit.presenter.ts';

export const createContainer = () => {
  const container = new Container({ defaultScope: 'Singleton' });

  container.bind<ConfigInterface>(ConfigInterface).to(Config);
  container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

  container.bind<UnitGatewayInterface>(UnitGatewayInterface).to(UnitGateway);
  container.bind<UnitServiceInterface>(UnitServiceInterface).to(UnitService);

  container.bind<FormStore>(FormStoreSymbol).to(FormStore);
  container.bind<UnitStore>(UnitStoreSymbol).to(UnitStore);

  container.bind<UnitPresenter>(UnitPresenterSymbol).to(UnitPresenter);

  return container;
};
