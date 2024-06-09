import React from 'react';

import { context } from '@/root/shop.context.ts';

export const useShop = () => {
  const { presenter } = React.useContext(context);

  return presenter.shop;
};
