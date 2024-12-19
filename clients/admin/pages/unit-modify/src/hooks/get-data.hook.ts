import React from 'react';

import { context } from '../module.context.ts';

export const useGetBrandData = () => {
  const { presenter } = React.useContext(context);

  return presenter.getData();
};
