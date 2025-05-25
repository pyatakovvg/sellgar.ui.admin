import React from 'react';

import { context } from '../module.context.ts';

export const usePresenter = () => {
  const { presenter } = React.useContext(context);
  return presenter;
};
