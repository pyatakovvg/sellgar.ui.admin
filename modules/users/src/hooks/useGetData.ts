import { useAuthInterceptor } from '@library/app';

import React from 'react';

import { context } from '@/root/users.context';

export const useGetData = () => {
  const { presenter } = React.useContext(context);

  const interceptor = useAuthInterceptor(async (query: any) => {
    await presenter.getData(query);
  });

  return React.useCallback(interceptor.intercept, []);
};
