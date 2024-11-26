import React from 'react';

import { context } from '../breadcrumbs.context.ts';

import { BreadcrumbEntity } from '../classes/breadcrumb.entity.ts';

export const useGetBreadcrumb = (): BreadcrumbEntity[] => {
  const { presenter } = React.useContext(context);

  return presenter.getAll();
};
