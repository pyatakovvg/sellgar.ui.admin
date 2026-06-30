import React from 'react';

import { Provider } from './widget.context.ts';
import { useSystemTheme } from './hooks/system-theme.hook.ts';

export const WidgetProvider: React.FC<React.PropsWithChildren> = (props) => {
  const systemTheme = useSystemTheme();
  const [preference, setPreference] = React.useState<'system' | 'light' | 'dark'>(() => {
    const theme = localStorage.getItem('theme');
    return theme === 'light' || theme === 'dark' ? theme : 'system';
  });

  const currentTheme = preference === 'system' ? systemTheme : preference;

  React.useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const handleSetTheme = (theme?: 'light' | 'dark') => {
    const nextTheme: 'system' | 'light' | 'dark' = theme ?? 'system';

    if (nextTheme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', nextTheme);
    }

    setPreference(nextTheme);
  };

  return (
    <Provider
      value={{
        theme: currentTheme,
        preference,
        setTheme: handleSetTheme,
      }}
    >
      {props.children}
    </Provider>
  );
};
