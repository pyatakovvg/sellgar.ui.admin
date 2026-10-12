import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { UnitModifyControllerInterface } from './controller/unit-modify/unit-modify-controller.interface.ts';
import { UnitModifyController } from './controller/unit-modify/unit-modify.controller.ts';

export class UnitModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(UnitModifyControllerInterface).to(UnitModifyController);
  }
}
