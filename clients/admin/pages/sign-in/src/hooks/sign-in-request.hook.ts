import { useRequest } from '@library/app';

import React from 'react';

import { context } from '../module.context.ts';

export const useSignInRequest = () => {
  const { presenter } = React.useContext(context);

  return useRequest(async (login: string, password: string) => {
    return await presenter.signIn(login, password);
  });
};
