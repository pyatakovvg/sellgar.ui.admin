import React from 'react';

import { context } from '../module.context.ts';

export const useGetUnits = () => {
  const { presenter } = React.useContext(context);

  return presenter.getUnits();
};
