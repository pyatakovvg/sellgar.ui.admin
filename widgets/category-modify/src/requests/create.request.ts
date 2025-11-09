import { useRequest } from '@library/app';
import { CreateCategoryDto } from '@library/domain';

import React from 'react';

import { context } from '../widget.context.tsx';

export const useCreateRequest = () => {
  const { controller } = React.useContext(context);

  return useRequest(async (data: CreateCategoryDto) => {
    await controller.create(data);
  });
};
