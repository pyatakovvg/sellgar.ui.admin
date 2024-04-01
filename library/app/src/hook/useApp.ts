import React from 'react';

import { context as AppContext } from '../application/Application';

export const useApp = () => {
  return React.useContext(AppContext);
};
