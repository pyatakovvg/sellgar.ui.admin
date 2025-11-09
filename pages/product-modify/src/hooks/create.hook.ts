import { useRequest } from '@library/app';

import React from 'react';

import { context } from '../module.context.ts';
import { CreateProductDto } from '../classes/controller/dto/create-product.dto.ts';

export const useCreate = () => {
  const { controller } = React.useContext(context);

  return useRequest((dto: CreateProductDto) => controller.create(dto));
};
