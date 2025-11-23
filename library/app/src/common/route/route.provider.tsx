import React from 'react';
import * as ReactRouter from 'react-router-dom';

import { Provider } from './route.context.ts';

export const RouteProvider: React.FC<React.PropsWithChildren> = (props) => {
  const data = ReactRouter.useLoaderData();

  return <Provider value={data}>{props.children}</Provider>;
};
