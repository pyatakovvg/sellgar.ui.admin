import { useRequest } from '@library/app';

import React from 'react';

import { CreatePropertyDto } from '../classes/controller/dto/create-property.dto.ts';

import { context } from '../widget.context.tsx';

export const useCreateRequest = () => {
  const { controller } = React.useContext(context);

  return useRequest(async (data: CreatePropertyDto) => {
    return await controller.create(data);
  });
};
