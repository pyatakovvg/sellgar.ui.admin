import React from 'react';

import type { IBreadcrumb } from './breadcrumbs.types.ts';

import { context } from './breadcrumbs.context.ts';

export const useSetBreadcrumbs = () => {
  const { setBreadcrumbs } = React.useContext(context);

  return (breadcrumbs: IBreadcrumb[]) => setBreadcrumbs(breadcrumbs);
};
