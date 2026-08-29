import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app-v2';

import { UnitControllerInterface } from './controller/unit/unit-controller.interface.ts';
import { UnitController } from './controller/unit/unit.controller.ts';

export class UnitsBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(UnitControllerInterface).to(UnitController);
  }
}
