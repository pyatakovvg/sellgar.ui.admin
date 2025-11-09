import { useRequest } from '@library/app';
import { UpdateCategoryDto } from '@library/domain';

import React from 'react';

import { context } from '../widget.context.tsx';

export const useUpdateRequest = () => {
  const { controller } = React.useContext(context);

  return useRequest(async (uuid: string, data: UpdateCategoryDto) => {
    return await controller.update(uuid, data);
  });
};
