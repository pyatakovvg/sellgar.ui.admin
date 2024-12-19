import { useRequest } from '@library/app';

import React from 'react';

import { context } from '../module.context.ts';

export const usePropertiesRequest = () => {
  const { presenter } = React.useContext(context);

  return useRequest(async () => {
    await presenter.findProperties();
  });
};
