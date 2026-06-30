import React from 'react';

const checkTheme = () => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'light';
};

export const useSystemTheme = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => checkTheme());
  const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  themeMediaQuery.onchange = (e: MediaQueryListEvent) => {
    if (e.matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return theme;
};
