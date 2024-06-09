import React from 'react';

import { context } from '@/root/user.context';

export const useRoles = () => {
  const { presenter } = React.useContext(context);

  return presenter.filterStore.roles;
};
