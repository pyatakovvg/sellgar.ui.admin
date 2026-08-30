import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app-v2';

import { SignOutControllerInterface } from './controller/sign-out-controller.interface.ts';
import { SignOutController } from './controller/sign-out.controller.ts';

export class SignOutBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(SignOutControllerInterface).to(SignOutController);
  }
}
