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

import { UnitStore, UnitStoreSymbol } from './store/unit.store.ts';
import { UnitsController, UnitsControllerSymbol } from './controller/units.controller.ts';

const container = new Container();

container.bind<ConfigInterface>(ConfigInterface).to(Config);
container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

container.bind<UnitGatewayInterface>(UnitGatewayInterface).to(UnitGateway);
container.bind<UnitServiceInterface>(UnitServiceInterface).to(UnitService);

container.bind<UnitStore>(UnitStoreSymbol).to(UnitStore).inSingletonScope();

container.bind<UnitsController>(UnitsControllerSymbol).to(UnitsController);

export { container };
