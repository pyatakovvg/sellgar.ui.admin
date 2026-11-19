import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { TemplatesControllerInterface } from './controller/templates-controller.interface.ts';
import { TemplatesController } from './controller/templates.controller.ts';

export class TemplatesBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(TemplatesControllerInterface).to(TemplatesController);
  }
}
