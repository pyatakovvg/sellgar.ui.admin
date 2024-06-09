import React from 'react';

import { context } from '@/root/user.context';

export const useUser = () => {
  const { presenter } = React.useContext(context);

  return presenter.userStore.user;
};
