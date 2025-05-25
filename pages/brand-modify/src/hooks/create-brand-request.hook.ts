import { useRequest } from '@library/app';
import { CreateBrandDto } from '@library/domain';

import React from 'react';

import { context } from '../module.context.ts';

export const useCreateBrandRequest = () => {
  const { presenter } = React.useContext(context);

  return useRequest(async (brand: CreateBrandDto) => {
    await presenter.create(brand);
  });
};
