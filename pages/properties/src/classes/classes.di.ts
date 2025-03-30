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

import { PropertyStore } from './store/property.store.ts';
import { PropertyStoreInterface } from './store/property-store.interface.ts';
import { PropertyController } from './controller/property.controller.ts';
import { PropertyControllerInterface } from './controller/property-controller.interface.ts';

let container: Container;

const create = () => {
  container = new Container();

  container.bind<ConfigInterface>(ConfigInterface).to(Config);
  container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

  container.bind<PropertyGroupGatewayInterface>(PropertyGroupGatewayInterface).to(PropertyGroupGateway);
  container.bind<PropertyGroupServiceInterface>(PropertyGroupServiceInterface).to(PropertyGroupService);

  container.bind<PropertyStoreInterface>(PropertyStoreInterface).to(PropertyStore);

  container.bind<PropertyControllerInterface>(PropertyControllerInterface).to(PropertyController);

  return container;
};

const destroy = () => {
  container.unbindAll();
};

export { create, destroy };
