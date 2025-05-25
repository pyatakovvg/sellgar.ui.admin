import { useRequest } from '@library/app';
import { UpdateBrandDto } from '@library/domain';

import React from 'react';

import { context } from '../module.context.ts';

export const useUpdateBrandRequest = () => {
  const { presenter } = React.useContext(context);

  return useRequest(async (uuid: string, brand: UpdateBrandDto) => {
    return await presenter.update(uuid, brand);
  });
};
