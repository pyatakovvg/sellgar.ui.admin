import React from 'react';

import { context } from '@/root/buckets.context.ts';

export const useBuckets = () => {
  const { presenter } = React.useContext(context);

  return presenter.bucketStore.buckets;
};
