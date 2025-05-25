import React from 'react';

import { context } from '../module.context.ts';

export const useCategories = () => {
  const { presenter } = React.useContext(context);

  return presenter.formStore.categories;
};
