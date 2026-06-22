import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';

import { PropertyStore } from './store/property.store.ts';
import { PropertyStoreInterface } from './store/property-store.interface.ts';
import { PropertyController } from './controller/property.controller.ts';
import { PropertyControllerInterface } from './controller/property-controller.interface.ts';

export class PropertiesBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(PropertyStoreInterface).to(PropertyStore);
    registry.bind(PropertyControllerInterface).to(PropertyController);
  }
}
