import React from 'react';

import { context } from '../widget.context.tsx';

export const useCategories = () => {
  const { controller } = React.useContext(context);

  return controller.formStore.categories;
};
