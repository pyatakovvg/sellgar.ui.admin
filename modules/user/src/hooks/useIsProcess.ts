import React from 'react';

import { context } from '../user.context';

export const useIsProcess = () => {
  const { presenter } = React.useContext(context);

  return presenter.isProcess;
};
