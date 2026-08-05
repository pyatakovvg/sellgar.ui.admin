import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { LogoutController } from './controller/logout.controller.ts';
import { LogoutControllerInterface } from './controller/logout-controller.interface.ts';

import { LogoutStore } from './store/logout/logout.store.ts';
import { LogoutStoreInterface } from './store/logout/logout-store.interface.ts';

export class LogoutBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(LogoutControllerInterface).to(LogoutController);
    registry.bind(LogoutStoreInterface).to(LogoutStore);
  }
}
