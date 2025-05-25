import { useRequest } from '@library/app';
import { PropertyEntity } from '@library/domain';

import React from 'react';

import { context } from '../module.context.ts';

export const useUpdateBrandRequest = () => {
  const { presenter } = React.useContext(context);

  return useRequest(async (brand: PropertyEntity) => {
    await presenter.update(brand.uuid, brand);
  });
};
