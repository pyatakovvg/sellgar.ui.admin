import React from 'react';

import { context } from '../breadcrumbs.context.ts';

import { BreadcrumbEntity } from '../classes/breadcrumb.entity.ts';

export const useAddBreadcrumb = () => {
  const { presenter } = React.useContext(context);

  return (breadcrumb: BreadcrumbEntity) => {
    presenter.add(breadcrumb);
  };
};
