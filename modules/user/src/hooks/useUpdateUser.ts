import { useAuthInterceptor } from '@library/app';
import { UpdateUserDto } from '@library/domain';

import React from 'react';

import { context } from '@/root/user.context';

export const useUpdateUser = () => {
  const { presenter } = React.useContext(context);

  const interceptor = useAuthInterceptor(async (user: UpdateUserDto) => {
    await presenter.updateUser(user);
  });

  return React.useCallback(interceptor.intercept, []);
};
