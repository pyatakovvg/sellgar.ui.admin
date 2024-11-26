import React from 'react';

import { context } from '../lng.context.ts';

export const useGetI18NextInstance = () => {
  const { presenter } = React.useContext(context);

  return presenter.getI18NextInstance();
};
