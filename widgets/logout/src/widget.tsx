import React from 'react';

import { WidgetView } from './view';
import { WidgetProvider } from './widget.provider.tsx';

export const Widget = () => {
  return (
    <WidgetProvider>
      <WidgetView />
    </WidgetProvider>
  );
};
