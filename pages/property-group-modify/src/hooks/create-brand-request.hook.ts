import { useRequest } from '@library/app';
import { PropertyGroupEntity } from '@library/domain';

import React from 'react';

import { context } from '../module.context.ts';

export const useCreateBrandRequest = () => {
  const { presenter } = React.useContext(context);

  return useRequest(async (entity: PropertyGroupEntity) => {
    await presenter.create(entity);
  });
};
