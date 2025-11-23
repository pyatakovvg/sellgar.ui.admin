import React from 'react';

import { context } from '../route.context.ts';

export const useLoaderData = <T>() => {
  return React.useContext(context) as T;
};
