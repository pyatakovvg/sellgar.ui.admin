import React from 'react';

import { context } from '../module.context.ts';

export const useGetPropertiesData = () => {
  const { presenter } = React.useContext(context);

  return presenter.getPropertiesData();
};
