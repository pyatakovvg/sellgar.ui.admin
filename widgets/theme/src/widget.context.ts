import React from 'react';

interface IContext {
  theme: 'light' | 'dark';
  preference: 'system' | 'light' | 'dark';
  setTheme(theme?: 'light' | 'dark'): void;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
