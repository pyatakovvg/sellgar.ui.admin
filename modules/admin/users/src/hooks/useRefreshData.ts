import { useAuthInterceptor } from '@library/app';

import React from 'react';

import { context } from '@/root/users.context';

export const useRefreshData = () => {
  const { presenter } = React.useContext(context);

  const interceptor = useAuthInterceptor(async (query: any) => {
    await presenter.refreshData(query);
  });

  return React.useCallback(interceptor.intercept, []);
};
