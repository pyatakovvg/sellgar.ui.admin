import { useRequest } from '@library/app';
import { BrandEntity } from '@library/domain';

import React from 'react';

import { context } from '../module.context.ts';

export const useUpdateBrandRequest = () => {
  const { presenter } = React.useContext(context);

  return useRequest(async (brand: BrandEntity) => {
    await presenter.update(brand.uuid, brand);
  });
};
