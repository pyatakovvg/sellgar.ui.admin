import { useRequest } from '@library/app';

import React from 'react';

import { context } from '../module.context.ts';
import { UpdateProductDto } from '../classes/store/form/dto/update-product.dto.ts';

export const useFindProductByUuidRequest = () => {
  const { presenter } = React.useContext(context);

  return useRequest(async (uuid: string) => {
    return await presenter.findByUuid(uuid);
  });
};
