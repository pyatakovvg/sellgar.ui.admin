import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';

import { UnitModifyController } from './controller/unit-modify.controller.ts';
import { UnitModifyControllerInterface } from './controller/unit-modify-controller.interface.ts';

export class UnitModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(UnitModifyControllerInterface).to(UnitModifyController);
  }
}
