import { ContainerModule } from 'inversify';

import { InitStore } from './stores/init/init.store.ts';
import { InitStoreInterface } from './stores/init/init-store.interface.ts';
import { AuthStore } from './stores/auth/auth.store.ts';
import { AuthStoreInterface } from './stores/auth/auth-store.interface.ts';
import { ProfileStore } from './stores/profile/profile.store.ts';
import { ProfileStoreInterface } from './stores/profile/profile-store.interface.ts';

import { ApplicationController } from './controller/application.controller.ts';
import { ApplicationControllerInterface } from './controller/application-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind(InitStoreInterface).to(InitStore);
  container.bind(AuthStoreInterface).to(AuthStore);
  container.bind(ProfileStoreInterface).to(ProfileStore);

  container.bind(ApplicationControllerInterface).to(ApplicationController).inSingletonScope();
});
