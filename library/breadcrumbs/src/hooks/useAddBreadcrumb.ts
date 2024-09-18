import React from 'react';

import { context } from '../breadcrumbs.context.ts';

import type { IBreadcrumb } from '../classes/breadcrumbs.store.ts';

export const useAddBreadcrumb = () => {
  const { presenter } = React.useContext(context);

  return (breadcrumb: IBreadcrumb) => {
    presenter.add(breadcrumb);
  };
};
