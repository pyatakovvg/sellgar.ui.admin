import React from 'react';

import { context } from '../module.context.ts';

export const useGetBrandInProcess = () => {
  const { presenter } = React.useContext(context);

  return presenter.getBrandInProcess();
};
