import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';

import { UnitController } from './controller/unit.controller.ts';
import { UnitControllerInterface } from './controller/unit-controller.interface.ts';

export class UnitModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(UnitControllerInterface).to(UnitController);
  }
}
