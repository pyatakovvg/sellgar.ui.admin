import React from 'react';

import { context } from '../user.context';

export const useRoles = () => {
  const { presenter } = React.useContext(context);

  return presenter.roles;
};
