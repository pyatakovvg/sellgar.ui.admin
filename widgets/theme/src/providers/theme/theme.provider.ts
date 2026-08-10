import { Provider, RuntimeProviderInterface } from '@sellgar/app';
import type { RuntimeProviderCleanup, RuntimeProviderContextInterface } from '@sellgar/app';
import { autorun } from 'mobx';

import { ThemeStoreInterface } from '../../classes/store/theme/theme-store.interface.ts';
import type { Theme, ThemePreference } from '../../classes/store/theme/theme-store.interface.ts';

@Provider()
export class ThemeProvider extends RuntimeProviderInterface {
  setup(context: RuntimeProviderContextInterface): RuntimeProviderCleanup {
    const themeStore = context.scope.get(ThemeStoreInterface);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const storedPreference = localStorage.getItem('theme');

    themeStore.setPreference(this.resolvePreference(storedPreference));
    themeStore.setSystemTheme(this.resolveSystemTheme(mediaQuery.matches));

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      themeStore.setSystemTheme(this.resolveSystemTheme(event.matches));
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    const disposeAutorun = autorun(() => {
      this.persistPreference(themeStore.preference);
      document.documentElement.setAttribute('data-theme', themeStore.currentTheme);
    });

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
      disposeAutorun();
    };
  }

  private resolvePreference(value: string | null): ThemePreference {
    return value === 'dark' || value === 'light' ? value : 'system';
  }

  private resolveSystemTheme(prefersDark: boolean): Theme {
    return prefersDark ? 'dark' : 'light';
  }

  private persistPreference(preference: ThemePreference): void {
    if (preference === 'system') {
      localStorage.removeItem('theme');
      return;
    }

    localStorage.setItem('theme', preference);
  }
}
