import React from 'react';

import { context } from '../message.context.ts';

export const useGetMessages = () => {
  const { presenter } = React.useContext(context);

  return presenter.getAll();
};
