import React from 'react';

import { context } from '../module.context.ts';

export const useGetGroups = () => {
  const { presenter } = React.useContext(context);

  return presenter.getGroups();
};
