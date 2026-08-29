import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app-v2';

import { ThemeControllerInterface } from './controller/theme/theme-controller.interface.ts';
import { ThemeController } from './controller/theme/theme.controller.ts';
import { ThemeStoreInterface } from './store/theme/theme-store.interface.ts';
import { ThemeStore } from './store/theme/theme.store.ts';

export class ThemeBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ThemeControllerInterface).to(ThemeController);
    registry.bind(ThemeStoreInterface).to(ThemeStore).inSingletonScope();
  }
}
