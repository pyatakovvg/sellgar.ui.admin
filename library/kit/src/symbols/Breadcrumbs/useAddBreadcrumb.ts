import React from 'react';

import type { IBreadcrumb } from './breadcrumbs.types.ts';

import { context } from './breadcrumbs.context.ts';

export const useAddBreadcrumb = (breadcrumb: IBreadcrumb) => {
  const { addBreadcrumb, resetBreadcrumbs } = React.useContext(context);

  React.useEffect(() => {
    addBreadcrumb(breadcrumb);
  }, []);
};
