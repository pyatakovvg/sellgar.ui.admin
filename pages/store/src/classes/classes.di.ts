import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';

import { StoreController } from './controller/store.controller.ts';
import { StoreControllerInterface } from './controller/store-controller.interface.ts';

export class StoreBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(StoreControllerInterface).to(StoreController);
  }
}
