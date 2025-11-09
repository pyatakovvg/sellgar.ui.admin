import { useRequest } from '@library/app';

import React from 'react';

import { CreatePropertyGroupDto } from '../classes/controller/dto/create-property-group.dto.ts';

import { context } from '../widget.context.tsx';

export const useCreateRequest = () => {
  const { controller } = React.useContext(context);

  return useRequest(async (data: CreatePropertyGroupDto) => {
    return await controller.create(data);
  });
};
