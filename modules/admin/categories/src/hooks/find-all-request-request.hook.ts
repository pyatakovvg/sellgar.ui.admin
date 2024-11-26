import { useRequest } from '@library/app';

import React from 'react';

import { context } from '../module.context.ts';

export const useFindAllRequest = () => {
  const { presenter } = React.useContext(context);

  return useRequest(async () => {
    return await presenter.findAll();
  });
};
