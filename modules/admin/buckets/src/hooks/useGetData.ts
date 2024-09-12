import { useAuthInterceptor } from '@library/app';

import React from 'react';

import { context } from '@/root/buckets.context.ts';

export const useGetData = () => {
  const { presenter } = React.useContext(context);

  const interceptor = useAuthInterceptor(async () => {
    await presenter.getData();
  });

  return React.useCallback(interceptor.intercept, []);
};
