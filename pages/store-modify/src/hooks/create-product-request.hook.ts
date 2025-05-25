import { useRequest } from '@library/app';

import React from 'react';

import { context } from '../module.context.ts';
import { CreateProductStoreDto } from '../classes/store/form/dto/create-product-store.dto.ts';

export const useCreateProductRequest = () => {
  const { presenter } = React.useContext(context);

  return useRequest(async (dto: CreateProductStoreDto) => {
    return await presenter.create(dto);
  });
};
