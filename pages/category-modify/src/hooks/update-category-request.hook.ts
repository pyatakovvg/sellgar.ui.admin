import { useRequest } from '@library/app';
import { UpdateCategoryDto } from '@library/domain';

import React from 'react';

import { context } from '../module.context.ts';

export const useUpdateCategoryRequest = () => {
  const { presenter } = React.useContext(context);

  return async (uuid: string, category: UpdateCategoryDto) => {
    return await presenter.update(uuid, category);
  };
};
