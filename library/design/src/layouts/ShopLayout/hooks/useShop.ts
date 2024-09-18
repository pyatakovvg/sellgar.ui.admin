import React from 'react';

import { context } from '../shop-layout.context.tsx';

export const useShop = () => {
  const { presenter } = React.useContext(context);

  return presenter.getShopStore().getData();
};
