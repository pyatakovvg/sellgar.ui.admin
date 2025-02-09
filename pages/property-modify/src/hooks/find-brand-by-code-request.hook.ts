import { useRequest } from '@library/app';

import React from 'react';

import { context } from '../module.context.ts';

export const useFindBrandByCodeRequest = () => {
  const { presenter } = React.useContext(context);

  return useRequest(async (uuid?: string) => {
    return await presenter.findByUuid(uuid);
  });
};
