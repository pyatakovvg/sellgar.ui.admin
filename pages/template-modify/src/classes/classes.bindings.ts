import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { TemplateModifyControllerInterface } from './controller/template-modify-controller.interface.ts';
import { TemplateModifyController } from './controller/template-modify.controller.ts';

export class TemplateModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(TemplateModifyControllerInterface).to(TemplateModifyController);
  }
}
