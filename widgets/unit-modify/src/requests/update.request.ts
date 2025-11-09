import { useRequest } from '@library/app';

import React from 'react';

import { context } from '../widget.context.tsx';

import { UpdateUnitDto } from '../classes/controller/dto/update-unit.dto.ts';

export const useUpdateRequest = () => {
  const { controller } = React.useContext(context);

  return useRequest((uuid: string, data: UpdateUnitDto) => controller.update(uuid, data));
};
