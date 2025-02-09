import React from 'react';

import { context } from '../module.context.ts';

export const useDataInProcess = () => {
  const { presenter } = React.useContext(context);

  return presenter.getCategoryInProcess();
};
