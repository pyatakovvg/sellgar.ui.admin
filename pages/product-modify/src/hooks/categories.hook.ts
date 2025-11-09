import React from 'react';

import { context } from '../module.context.ts';

export const useCategories = () => {
  const { controller } = React.useContext(context);

  return controller.formStore.categories;
};
