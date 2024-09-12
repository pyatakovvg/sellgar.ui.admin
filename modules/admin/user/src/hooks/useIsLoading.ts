import React from 'react';

import { context } from '@/root/user.context';

export const useIsLoading = () => {
  const { presenter } = React.useContext(context);

  return presenter.isLoading;
};
