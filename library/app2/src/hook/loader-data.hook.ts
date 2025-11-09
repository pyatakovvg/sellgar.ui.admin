import React from 'react';

import { context, type IContext } from '../app/route/route.context.ts';

export const useLoaderData = <T = any>(): T => {
  const { data } = React.useContext<IContext<T>>(context);

  return data as T;
};
