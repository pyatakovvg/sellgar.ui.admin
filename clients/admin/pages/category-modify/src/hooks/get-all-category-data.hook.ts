import React from 'react';

import { context } from '../module.context.ts';

export const useGetAllCategoriesData = () => {
  const { presenter } = React.useContext(context);

  return presenter.getAllCategoriesData();
};
