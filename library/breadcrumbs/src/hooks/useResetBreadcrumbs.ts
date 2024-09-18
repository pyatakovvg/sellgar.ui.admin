import React from 'react';

import { context } from '../breadcrumbs.context.ts';

export const useResetBreadcrumbs = () => {
  const { presenter } = React.useContext(context);

  return () => {
    presenter.reset();
  };
};
