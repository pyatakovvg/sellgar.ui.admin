import { WidgetProvider as ThemeWidgetProvider } from '@widget/theme';

import type { LayoutViewProps } from '@sellgar/app';

import React from 'react';

import s from './default.module.scss';

export const LayoutView: React.FC<LayoutViewProps> = (props) => {
  return (
    <ThemeWidgetProvider>
      <div className={s.wrapper}>{props.children}</div>
    </ThemeWidgetProvider>
  );
};
