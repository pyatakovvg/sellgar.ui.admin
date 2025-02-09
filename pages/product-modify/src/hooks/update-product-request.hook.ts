import { useRequest } from '@library/app';

import React from 'react';

import { context } from '../module.context.ts';
import { UpdateProductDto } from '../classes/store/form/dto/update-product.dto.ts';

export const useUpdateProductRequest = () => {
  const { presenter } = React.useContext(context);

  return useRequest(async (dto: UpdateProductDto) => {
    return await presenter.update(dto.uuid, dto);
  });
};
