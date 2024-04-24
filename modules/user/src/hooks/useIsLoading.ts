import React from 'react';

import { context } from '../user.context';

export const useIsLoading = () => {
  const { presenter } = React.useContext(context);

  return presenter.isLoading;
};
