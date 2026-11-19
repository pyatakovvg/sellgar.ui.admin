import type { ThemeStoreInterface } from '../../../store/theme/theme-store.interface.ts';
import { describe, expect, it, vi } from 'vitest';

import { ThemeController } from '../theme.controller.ts';

describe('ThemeController', () => {
  it('возвращает принадлежащее widget состояние темы', () => {
    const themeStore = createThemeStore();
    const controller = new ThemeController(themeStore);

    expect(controller.loader()).toBe(themeStore);
  });

  it('изменяет preference через action widget runtime', () => {
    const themeStore = createThemeStore();
    const controller = new ThemeController(themeStore);

    controller.action({
      payload: { preference: 'dark' },
      props: {},
      signal: new AbortController().signal,
    });

    expect(themeStore.setPreference).toHaveBeenCalledWith('dark');
  });

  it('циклически выбирает следующий preference для icon-only команды', () => {
    const themeStore = createThemeStore();
    const controller = new ThemeController(themeStore);

    controller.action({
      payload: {},
      props: { isOnlyIcon: true },
      signal: new AbortController().signal,
    });

    expect(themeStore.setPreference).toHaveBeenCalledWith('light');
  });
});

const createThemeStore = (): ThemeStoreInterface => {
  return {
    currentTheme: 'light',
    preference: 'system',
    setPreference: vi.fn(),
    setSystemTheme: vi.fn(),
    systemTheme: 'light',
  };
};
