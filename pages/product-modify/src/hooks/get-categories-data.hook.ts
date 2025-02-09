import React from 'react';

import { context } from '../module.context.ts';

export const useGetCategoriesData = () => {
  const { presenter } = React.useContext(context);

  return presenter.getCategoriesData();
};
