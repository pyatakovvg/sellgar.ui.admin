import React from 'react';

import { context } from '../module.context.ts';

export const useInProcess = () => {
  const { controller } = React.useContext(context);

  return controller.productStore.inProcess;
};
