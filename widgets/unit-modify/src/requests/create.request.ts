import { useRequest } from '@library/app';

import React from 'react';

import { context } from '../widget.context.tsx';

import { CreateUnitDto } from '../classes/controller/dto/create-unit.dto.ts';

export const useCreateRequest = () => {
  const { controller } = React.useContext(context);

  return useRequest((data: CreateUnitDto) => controller.create(data));
};
