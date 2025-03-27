import { Config, ConfigInterface, HttpClient, HttpClientInterface } from '@library/domain';
import { PropertyGateway, PropertyGatewayInterface, PropertyService, PropertyServiceInterface } from '@library/domain';
import {
  PropertyGroupGateway,
  PropertyGroupGatewayInterface,
  PropertyGroupService,
  PropertyGroupServiceInterface,
} from '@library/domain';
import { UnitGateway, UnitGatewayInterface, UnitService, UnitServiceInterface } from '@library/domain';

import { Container } from 'inversify';

import { FormStore, FormStoreSymbol } from './store/form.store.ts';
import { PropertyStore, PropertyStoreSymbol } from './store/property.store.ts';

import { PropertyPresenter, PropertyPresenterSymbol } from './presenter/property.presenter.ts';

let container: Container;

export const create = () => {
  container = new Container();

  container.bind<ConfigInterface>(ConfigInterface).to(Config);
  container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

  container.bind<UnitGatewayInterface>(UnitGatewayInterface).to(UnitGateway);
  container.bind<UnitServiceInterface>(UnitServiceInterface).to(UnitService);

  container.bind<PropertyGatewayInterface>(PropertyGatewayInterface).to(PropertyGateway);
  container.bind<PropertyServiceInterface>(PropertyServiceInterface).to(PropertyService);

  container.bind<PropertyGroupGatewayInterface>(PropertyGroupGatewayInterface).to(PropertyGroupGateway);
  container.bind<PropertyGroupServiceInterface>(PropertyGroupServiceInterface).to(PropertyGroupService);

  container.bind<FormStore>(FormStoreSymbol).to(FormStore);
  container.bind<PropertyStore>(PropertyStoreSymbol).to(PropertyStore);

  container.bind<PropertyPresenter>(PropertyPresenterSymbol).to(PropertyPresenter);

  return container;
};

export const destroy = () => container.unbindAll();
