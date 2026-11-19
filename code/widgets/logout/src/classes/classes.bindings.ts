import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { LogoutControllerInterface } from './controller/logout/logout-controller.interface.ts';
import { LogoutController } from './controller/logout/logout.controller.ts';

export class LogoutBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(LogoutControllerInterface).to(LogoutController);
  }
}
