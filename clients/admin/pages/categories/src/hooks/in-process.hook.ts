import React from 'react';

import { context } from '../module.context.ts';

export const useInProcess = () => {
  const { presenter } = React.useContext(context);

  return presenter.getInProcess();
};
