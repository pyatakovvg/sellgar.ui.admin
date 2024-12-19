import React from 'react';

import { context } from '../buckets.context.ts';

export const useRemove = () => {
  const { presenter } = React.useContext(context);

  return presenter.remove;
};
