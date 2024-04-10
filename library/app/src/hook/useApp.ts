import React from 'react';

import { context } from '../application.context.ts';

export const useApp = () => {
  return React.useContext(context);
};
