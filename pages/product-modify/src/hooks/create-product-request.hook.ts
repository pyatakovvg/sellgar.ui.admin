import { useRequest } from '@library/app';

import React from 'react';

import { context } from '../module.context.ts';
import { CreateProductDto } from '../classes/store/form/dto/create-product.dto.ts';

export const useCreateProductRequest = () => {
  const { presenter } = React.useContext(context);

  return useRequest(async (dto: CreateProductDto) => {
    return await presenter.create(dto);
  });
};
