import React from 'react';

import { context } from '../module.context.ts';

export const useGetPricesData = () => {
  const { presenter } = React.useContext(context);

  return presenter.getPricesData();
};
