import React from 'react';

import { context } from '../module.context.ts';

export const useProperties = () => {
  const { controller } = React.useContext(context);

  return controller.formStore.properties;
};
