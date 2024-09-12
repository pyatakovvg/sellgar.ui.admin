import { useAuthInterceptor } from '@library/app';

import React from 'react';

import { context } from '@/root/files.context.ts';

export const useGetData = () => {
  const { presenter } = React.useContext(context);

  const interceptor = useAuthInterceptor(async (bucketName: string) => {
    await presenter.getData(bucketName);
  });

  return React.useCallback(interceptor.intercept, []);
};
