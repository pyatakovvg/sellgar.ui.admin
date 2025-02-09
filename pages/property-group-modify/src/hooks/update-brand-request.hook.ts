import { useRequest } from '@library/app';
import { PropertyGroupEntity } from '@library/domain';

import React from 'react';

import { context } from '../module.context.ts';

export const useUpdateBrandRequest = () => {
  const { presenter } = React.useContext(context);

  return useRequest(async (entity: PropertyGroupEntity) => {
    await presenter.update(entity.uuid, entity);
  });
};
