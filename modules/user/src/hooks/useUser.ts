import React from 'react';

import { context } from '../user.context';

export const useUser = () => {
  const { presenter } = React.useContext(context);

  return presenter.user;
};
