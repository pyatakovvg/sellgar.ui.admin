import React from 'react';

import { VariantsContext } from '../context/variants.context.ts';

export const useVariants = () => {
  const value = React.useContext(VariantsContext);

  if (!value) {
    throw new Error('useVariants доступен только внутри Variants.');
  }

  return value;
};
