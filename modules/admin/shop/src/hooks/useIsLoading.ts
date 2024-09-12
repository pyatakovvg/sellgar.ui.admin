import React from 'react';

import { context } from '@/root/shop.context.ts';

export const useIsLoading = () => {
  const { presenter } = React.useContext(context);

  return presenter.isLoading;
};
