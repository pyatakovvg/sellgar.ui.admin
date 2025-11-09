import { ContainerModule } from 'inversify';

import { LogoutController } from './controller/logout.controller.ts';
import { LogoutControllerInterface } from './controller/logout-controller.interface.ts';

import { LogoutStore } from './store/logout/logout.store.ts';
import { LogoutStoreInterface } from './store/logout/logout-store.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind<LogoutControllerInterface>(LogoutControllerInterface).to(LogoutController);

  container.bind<LogoutStoreInterface>(LogoutStoreInterface).to(LogoutStore);
});
