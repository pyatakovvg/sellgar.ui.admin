import { Controller, Inject } from '@sellgar/app-v2';

import { ThemeStoreInterface } from '../../store/theme/theme-store.interface.ts';
import type { ThemePreference } from '../../store/theme/theme-store.interface.ts';
import { ThemeControllerInterface } from './theme-controller.interface.ts';

@Controller()
export class ThemeController extends ThemeControllerInterface {
  constructor(@Inject(ThemeStoreInterface) private readonly themeStore: ThemeStoreInterface) {
    super();
  }

  loader(): ThemeStoreInterface {
    return this.themeStore;
  }

  action(args: Parameters<ThemeControllerInterface['action']>[0]): void {
    this.themeStore.setPreference(args.payload.preference ?? this.getNextPreference());
  }

  private getNextPreference(): ThemePreference {
    switch (this.themeStore.preference) {
      case 'dark':
        return 'system';
      case 'light':
        return 'dark';
      case 'system':
        return 'light';
    }
  }
}
