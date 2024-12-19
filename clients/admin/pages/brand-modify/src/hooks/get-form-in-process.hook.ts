import React from 'react';

import { context } from '../module.context.ts';

export const useGetFormInProcess = () => {
  const { presenter } = React.useContext(context);

  return presenter.getFormInProcess();
};
