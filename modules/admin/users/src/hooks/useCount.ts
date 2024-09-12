import React from 'react';

import { context } from '@/root/users.context';

export const useCount = () => {
  const { presenter } = React.useContext(context);

  return presenter.userStore.count;
};
