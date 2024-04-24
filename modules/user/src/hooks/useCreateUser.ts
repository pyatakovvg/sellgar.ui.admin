import { useAuthInterceptor } from '@library/app';
import { CreateUserDto } from '@library/domain';

import React from 'react';

import { context } from '../user.context';

export const useCreateUser = () => {
  const { presenter } = React.useContext(context);

  const interceptor = useAuthInterceptor(async (user: CreateUserDto) => {
    await presenter.createUser(user);
  });

  return React.useCallback(interceptor.intercept, []);
};
