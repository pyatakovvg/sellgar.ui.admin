import { useRequest } from '@library/app';

import React from 'react';

import { context } from '../module.context.ts';
import { UpdateProductStoreDto } from '../classes/store/form/dto/update-product-store.dto.ts';

export const useUpdateProductRequest = () => {
  const { presenter } = React.useContext(context);

  return useRequest(async (dto: UpdateProductStoreDto) => {
    return await presenter.update(dto.uuid, dto);
  });
};
