import { useAuthInterceptor } from '@library/app';

import React from 'react';

import { context } from '../user.context';

export const useGetUserByUuid = () => {
  const { presenter } = React.useContext(context);

  const interceptor = useAuthInterceptor(async (uuid: string) => {
    await presenter.getUserByUuid(uuid);
  });

  return React.useCallback(interceptor.intercept, []);
};
