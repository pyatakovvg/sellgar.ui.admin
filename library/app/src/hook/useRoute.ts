import React from 'react';

import { context } from '../route.context.ts';

export const useRoute = () => {
  const { route } = React.useContext(context);

  return route;
};
