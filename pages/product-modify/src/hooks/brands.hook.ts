import React from 'react';

import { context } from '../module.context.ts';

export const useBrands = () => {
  const { controller } = React.useContext(context);

  return controller.formStore.brands;
};
