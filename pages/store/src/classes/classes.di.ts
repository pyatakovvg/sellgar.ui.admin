import { ContainerModule } from 'inversify';

import { StoreController } from './controller/store.controller.ts';
import { StoreControllerInterface } from './controller/store-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind<StoreControllerInterface>(StoreControllerInterface).to(StoreController);
});
