import React from 'react';

import { useAwaitLoaderData } from '../application';
import { Provider } from './widget-loader-data.context.ts';

export const WidgetLoaderDataProvider: React.FC<React.PropsWithChildren> = (props) => {
  const data = useAwaitLoaderData();

  return <Provider value={data}>{props.children}</Provider>;
};
