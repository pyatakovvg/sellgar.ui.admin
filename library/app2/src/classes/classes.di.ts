import { ContainerModule } from 'inversify';

import { ProfileStore } from './stores/profile/profile.store.ts';
import { ProfileStoreInterface } from './stores/profile/profile-store.interface.ts';
import { ApplicationStore } from './stores/application/application.store.ts';
import { ApplicationStoreInterface } from './stores/application/application-store.interface.ts';

import { ApplicationController } from './controller/application.controller.ts';
import { ApplicationControllerInterface } from './controller/application-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind(ProfileStoreInterface).to(ProfileStore);
  container.bind(ApplicationStoreInterface).to(ApplicationStore);

  container.bind(ApplicationControllerInterface).to(ApplicationController).inSingletonScope();
});
