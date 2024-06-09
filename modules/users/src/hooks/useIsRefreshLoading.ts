import React from 'react';

import { context } from '@/root/users.context';

export const useIsRefreshLoading = () => {
  const { presenter } = React.useContext(context);

  return presenter.inUpdateProcess;
};
