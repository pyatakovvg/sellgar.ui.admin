import React from 'react';

import { context } from '@/root/users.context';

export const useUsers = () => {
  const { presenter } = React.useContext(context);

  return presenter.userStore.users;
};
