import { useRequest } from '@library/app';
import { CreateBrandDto } from '@library/domain';

import React from 'react';

import { context } from '../widget.context.tsx';

export const useCreateRequest = () => {
  const { controller } = React.useContext(context);

  return useRequest(async (brand: CreateBrandDto) => {
    await controller.create(brand);
  });
};
