import { useRequest } from '@library/app';
import { CreateCategoryDto } from '@library/domain';

import React from 'react';

import { context } from '../module.context.ts';

export const useCreateCategoryRequest = () => {
  const { presenter } = React.useContext(context);

  return async (category: CreateCategoryDto) => {
    return await presenter.create(category);
  };
};
