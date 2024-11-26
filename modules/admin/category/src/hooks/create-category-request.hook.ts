import { useRequest } from '@library/app';
import { CategoryEntity } from '@library/domain';

import React from 'react';

import { context } from '../module.context.ts';

export const useCreateCategoryRequest = () => {
  const { presenter } = React.useContext(context);

  return useRequest(async (category: CategoryEntity) => {
    await presenter.create(category);
  });
};
