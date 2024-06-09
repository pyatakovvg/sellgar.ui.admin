import React from 'react';

import { context } from '@/root/files.context.ts';

export const useIsLoading = () => {
  const { presenter } = React.useContext(context);

  return presenter.inProcess;
};
