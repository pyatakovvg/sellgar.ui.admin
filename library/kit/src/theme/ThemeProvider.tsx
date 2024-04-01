'use client';

import React from 'react';

import './palette.css';
import './animation.css';
import './variables.css';
import './tokens.css';
import './reset.css';

export enum ETheme {
  DARK = 'dark',
  LIGHT = 'light',
}

export const useTheme = () => {
  const [theme, setTheme] = React.useState<keyof typeof ETheme>();

  React.useEffect(() => {
    const htmlElement = document.querySelector('html')!;
    htmlElement.dataset.theme = (theme || '').toLowerCase();
  }, [theme]);

  return {
    setTheme,
  };
};
