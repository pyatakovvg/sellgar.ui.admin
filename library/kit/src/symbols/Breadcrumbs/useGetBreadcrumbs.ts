import React from 'react';

import { context } from './breadcrumbs.context.ts';
import type { IBreadcrumb } from './breadcrumbs.types.ts';

export const useGetBreadcrumb = (): IBreadcrumb[] => {
  const { breadcrumbs } = React.useContext(context);

  return breadcrumbs;
};
