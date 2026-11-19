import { describe, expect, it } from 'vitest';

import { ThemeStore } from '../theme.store.ts';

describe('ThemeStore', () => {
  it('использует системную тему для preference system', () => {
    const store = new ThemeStore();

    store.setSystemTheme('dark');

    expect(store.preference).toBe('system');
    expect(store.currentTheme).toBe('dark');
  });

  it('использует выбранную тему независимо от системной', () => {
    const store = new ThemeStore();

    store.setSystemTheme('dark');
    store.setPreference('light');

    expect(store.currentTheme).toBe('light');
  });
});
