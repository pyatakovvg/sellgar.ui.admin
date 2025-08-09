import { ContainerModule } from 'inversify';

import { PropertyStore } from './store/property.store.ts';
import { PropertyStoreInterface } from './store/property-store.interface.ts';
import { PropertyController } from './controller/property.controller.ts';
import { PropertyControllerInterface } from './controller/property-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind<PropertyStoreInterface>(PropertyStoreInterface).to(PropertyStore);

  container.bind<PropertyControllerInterface>(PropertyControllerInterface).to(PropertyController);
});
