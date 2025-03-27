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

import { PropertyStore, PropertyStoreSymbol } from './store/property.store.ts';
import { PropertyController, PropertyControllerSymbol } from './controller/property.controller.ts';

let container: Container;

const create = () => {
  container = new Container();

  container.bind<ConfigInterface>(ConfigInterface).to(Config);
  container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

  container.bind<PropertyGroupGatewayInterface>(PropertyGroupGatewayInterface).to(PropertyGroupGateway);
  container.bind<PropertyGroupServiceInterface>(PropertyGroupServiceInterface).to(PropertyGroupService);

  container.bind<PropertyStore>(PropertyStoreSymbol).to(PropertyStore).inSingletonScope();

  container.bind<PropertyController>(PropertyControllerSymbol).to(PropertyController);

  return container;
};

const destroy = () => {
  container.unbindAll();
};

export { create, destroy };
