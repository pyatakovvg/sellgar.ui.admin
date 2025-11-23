import { useNavigate, useRequest } from '@library/app';

import React from 'react';

import { context } from '../widget.context.tsx';

export const useLogout = () => {
  const { controller } = React.useContext(context);

  const navigate = useNavigate();

  return useRequest(async () => {
    try {
      await controller.logout();

      navigate.replace('/sign-in');
    } catch (error) {
      throw error;
    }
  });
};
