import { useAuthInterceptor } from '@library/app';

import React from 'react';

import { context } from '@/root/shop.context.ts';

export const useGetData = () => {
  const { presenter } = React.useContext(context);

  const interceptor = useAuthInterceptor(async (uuid: string) => {
    await presenter.getData(uuid);
  });

  return interceptor.intercept;
};
