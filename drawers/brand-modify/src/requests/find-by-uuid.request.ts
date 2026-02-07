import { useRequest } from '@library/app';

import React from 'react';

import { context } from '../drawer.context.tsx';

export const useFindByUuidRequest = () => {
  const { controller } = React.useContext(context);

  return useRequest((uuid: string) => controller.findByUuid(uuid));
};
