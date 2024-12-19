import React from 'react';

import { context } from '../buckets.context.ts';

export const useIsLoading = () => {
  const { presenter } = React.useContext(context);

  return presenter.inProcess;
};
