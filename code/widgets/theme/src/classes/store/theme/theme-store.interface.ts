export type Theme = 'dark' | 'light';
export type ThemePreference = Theme | 'system';

export abstract class ThemeStoreInterface {
  abstract readonly currentTheme: Theme;
  abstract readonly preference: ThemePreference;
  abstract readonly systemTheme: Theme;

  abstract setPreference(preference: ThemePreference): void;
  abstract setSystemTheme(theme: Theme): void;
}
