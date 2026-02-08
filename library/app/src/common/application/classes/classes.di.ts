import { ContainerModule } from 'inversify';

import { AuthStore } from './stores/auth/auth.store.ts';
import { AuthStoreInterface } from './stores/auth/auth-store.interface.ts';
import { DataStore } from './stores/data/data.store.ts';
import { DataStoreInterface } from './stores/data/data-store.interface.ts';

import { ApplicationController } from './controller/application.controller.ts';
import { ApplicationControllerInterface } from './controller/application-controller.interface.ts';
import { NavigateService } from './services/navigate/navigate.service.ts';
import { NavigateServiceInterface } from './services/navigate/navigate-service.interface.ts';
import { LocationService } from './services/location/location.service.ts';
import { LocationServiceInterface } from './services/location/location-service.interface.ts';
import { RevalidateService } from './services/revalidate/revalidate.service.ts';
import { RevalidateServiceInterface } from './services/revalidate/revalidate-service.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind(AuthStoreInterface).to(AuthStore);
  container.bind(DataStoreInterface).to(DataStore);
  container.bind(NavigateServiceInterface).to(NavigateService).inSingletonScope();
  container.bind(LocationServiceInterface).to(LocationService).inSingletonScope();
  container.bind(RevalidateServiceInterface).to(RevalidateService).inSingletonScope();

  container.bind(ApplicationControllerInterface).to(ApplicationController).inSingletonScope();
});
