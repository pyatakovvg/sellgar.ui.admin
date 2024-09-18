import React from 'react';

import { context } from '../breadcrumbs.context.ts';

export const useChangeBreadcrumb = () => {
  const { presenter } = React.useContext(context);

  return (id: string, label: string) => {
    const breadcrumb = presenter.getById(id);
    if (breadcrumb?.type === 'FUNCTION') {
      presenter.update(id, label);
    }
  };
};
