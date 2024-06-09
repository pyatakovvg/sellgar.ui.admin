import React from 'react';

import { context } from '@/root/users.context';

export const useRoles = () => {
  const { presenter } = React.useContext(context);

  return presenter.filterStore.roles;
};
