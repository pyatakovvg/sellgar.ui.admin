import React from 'react';

import { context } from '../module.context.ts';

export const useGetProductInProcess = () => {
  const { presenter } = React.useContext(context);

  return presenter.getProductInProcess();
};
