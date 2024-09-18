import React from 'react';

import { context } from '../breadcrumbs.context.ts';

import type { IBreadcrumb } from '../classes/breadcrumbs.store.ts';

export const useGetBreadcrumb = (): IBreadcrumb[] => {
  const { presenter } = React.useContext(context);

  return presenter.getAll();
};
