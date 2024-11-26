import React from 'react';

import { context } from '../module.context.ts';

export const useGetCategoryData = () => {
  const { presenter } = React.useContext(context);

  return presenter.getCategoryData();
};
