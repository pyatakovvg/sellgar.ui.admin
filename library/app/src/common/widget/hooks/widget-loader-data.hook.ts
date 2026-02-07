import React from 'react';

import { context } from '../widget-loader-data.context.ts';

export const useWidgetLoaderData = <T>() => {
  return React.useContext(context) as T;
};
