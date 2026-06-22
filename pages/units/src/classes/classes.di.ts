import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';

import { UnitsController } from './controller/units.controller.ts';
import { UnitsControllerInterface } from './controller/units-controller.interface.ts';

export class UnitsBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(UnitsControllerInterface).to(UnitsController);
  }
}
