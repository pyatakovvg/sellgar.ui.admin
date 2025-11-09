import { useRequest } from '@library/app';

import React from 'react';

import { UpdatePropertyDto } from '../classes/controller/dto/update-property.dto.ts';

import { context } from '../widget.context.tsx';

export const useUpdateRequest = () => {
  const { controller } = React.useContext(context);

  return useRequest(async (uuid: string, data: UpdatePropertyDto) => {
    return await controller.update(uuid, data);
  });
};
