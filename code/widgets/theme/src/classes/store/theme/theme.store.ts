import { Injectable } from '@sellgar/app';
import { action, computed, makeObservable, observable } from 'mobx';

import { ThemeStoreInterface } from './theme-store.interface.ts';
import type { Theme, ThemePreference } from './theme-store.interface.ts';

@Injectable()
export class ThemeStore extends ThemeStoreInterface {
  private preferenceValue: ThemePreference = 'system';
  private systemThemeValue: Theme = 'light';

  constructor() {
    super();
    makeObservable<this, 'preferenceValue' | 'systemThemeValue'>(this, {
      currentTheme: computed,
      preference: computed,
      preferenceValue: observable,
      setPreference: action.bound,
      setSystemTheme: action.bound,
      systemTheme: computed,
      systemThemeValue: observable,
    });
  }

  get currentTheme(): Theme {
    return this.preferenceValue === 'system' ? this.systemThemeValue : this.preferenceValue;
  }

  get preference(): ThemePreference {
    return this.preferenceValue;
  }

  get systemTheme(): Theme {
    return this.systemThemeValue;
  }

  setPreference(preference: ThemePreference): void {
    this.preferenceValue = preference;
  }

  setSystemTheme(theme: Theme): void {
    this.systemThemeValue = theme;
  }
}
