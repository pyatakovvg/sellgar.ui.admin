import React from 'react';

import { context } from '@/root/user.context';

export const useIsProcess = () => {
  const { presenter } = React.useContext(context);

  return presenter.isProcess;
};
