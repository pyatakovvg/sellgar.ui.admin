import React from 'react';

import { VariantContext } from '../context/variant.context.ts';

export const useVariant = () => {
  const value = React.useContext(VariantContext);

  if (!value) {
    throw new Error('useVariant доступен только внутри Variant.');
  }

  return value;
};
