import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';
import { VariantModifyController } from './controller/variant-modify/variant-modify.controller.ts';
import { VariantModifyControllerInterface } from './controller/variant-modify/variant-modify-controller.interface.ts';

export class VariantModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(VariantModifyControllerInterface).to(VariantModifyController);
  }
}
