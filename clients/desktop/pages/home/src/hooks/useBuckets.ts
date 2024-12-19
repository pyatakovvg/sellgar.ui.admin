import React from 'react';

import { context } from '../buckets.context.ts';

export const useBuckets = () => {
  const { presenter } = React.useContext(context);

  return [];
};
