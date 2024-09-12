import React from 'react';

import { context } from '@/root/users.context';

export const useIsLoading = () => {
  const { presenter } = React.useContext(context);

  return presenter.inProcess;
};
