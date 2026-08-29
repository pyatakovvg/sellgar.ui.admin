import { Inject, Provider, type ProviderCleanup, type ProviderInterface } from '@sellgar/app-v2';
import { autorun } from 'mobx';

import { ThemeStoreInterface } from '../../classes/store/theme/theme-store.interface.ts';
import type { Theme, ThemePreference } from '../../classes/store/theme/theme-store.interface.ts';

@Provider()
export class ThemeProvider implements ProviderInterface {
  constructor(@Inject(ThemeStoreInterface) private readonly themeStore: ThemeStoreInterface) {}

  activate(): ProviderCleanup {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const storedPreference = localStorage.getItem('theme');

    this.themeStore.setPreference(this.resolvePreference(storedPreference));
    this.themeStore.setSystemTheme(this.resolveSystemTheme(mediaQuery.matches));

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      this.themeStore.setSystemTheme(this.resolveSystemTheme(event.matches));
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    const disposeAutorun = autorun(() => {
      this.persistPreference(this.themeStore.preference);
      document.documentElement.setAttribute('data-theme', this.themeStore.currentTheme);
    });

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
      disposeAutorun();
    };
  }

  dispose(): void {}

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
