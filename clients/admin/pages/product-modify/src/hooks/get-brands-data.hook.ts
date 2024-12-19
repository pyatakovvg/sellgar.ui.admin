import React from 'react';

import { context } from '../module.context.ts';

export const useGetBrandsData = () => {
  const { presenter } = React.useContext(context);

  return presenter.getBrandsData();
};
