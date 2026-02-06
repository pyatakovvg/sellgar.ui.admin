import { ContainerModule } from 'inversify';

import { AuthStore } from './stores/auth/auth.store.ts';
import { AuthStoreInterface } from './stores/auth/auth-store.interface.ts';

import { ApplicationController } from './controller/application.controller.ts';
import { ApplicationControllerInterface } from './controller/application-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind(AuthStoreInterface).to(AuthStore);

  container.bind(ApplicationControllerInterface).to(ApplicationController).inSingletonScope();
});
