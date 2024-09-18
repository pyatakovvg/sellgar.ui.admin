import React from 'react';

import { context } from '@/root/shop.context.ts';

export const useCompanyList = () => {
  const { presenter } = React.useContext(context);

  return presenter.getCompanyStore().getData();
};
