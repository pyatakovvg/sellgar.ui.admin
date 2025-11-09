import { useRequest } from '@library/app';

import React from 'react';

import { UpdatePropertyGroupDto } from '../classes/controller/dto/update-property-group.dto.ts';

import { context } from '../widget.context.tsx';

export const useUpdateRequest = () => {
  const { controller } = React.useContext(context);

  return useRequest(async (uuid: string, data: UpdatePropertyGroupDto) => {
    return await controller.update(uuid, data);
  });
};
