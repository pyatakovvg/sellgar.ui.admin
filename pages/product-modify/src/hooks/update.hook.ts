import { useRequest } from '@library/app';

import React from 'react';

import { context } from '../module.context.ts';
import { UpdateProductDto } from '../classes/controller/dto/update-product.dto.ts';

export const useUpdate = () => {
  const { controller } = React.useContext(context);

  return useRequest((uuid: string, dto: UpdateProductDto) => controller.update(uuid, dto));
};
