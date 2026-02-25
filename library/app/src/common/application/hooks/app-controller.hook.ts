import React from 'react';

import { context } from '../application.context.ts';

export const useAppController = () => {
  const { controller } = React.useContext(context);

  return controller;
};
