import React from 'react';

import { context } from '../buckets.context.ts';

export const useGetData = () => {
  const { presenter } = React.useContext(context);

  return () => {};
};
