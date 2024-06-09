import { useAuthInterceptor } from '@library/app';
import { CreateUserDto } from '@library/domain';

import React from 'react';

import { context } from '@/root/user.context';

export const useCreateUser = () => {
  const { presenter } = React.useContext(context);

  const interceptor = useAuthInterceptor(async (userDto: CreateUserDto) => {
    await presenter.createUser(userDto);
  });

  return interceptor.intercept;
};
