import React from 'react';

import { context } from '../module.context.ts';

export const useGetData = () => {
  const { controller } = React.useContext(context);

  return controller.getData();
};
