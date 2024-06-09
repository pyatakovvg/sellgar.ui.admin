import React from 'react';

import type { IBreadcrumb } from './breadcrumbs.types.ts';

interface IContext {
  breadcrumbs: IBreadcrumb[];
  addBreadcrumb: (breadcrumb: IBreadcrumb) => void;
  setBreadcrumbs: (breadcrumbs: IBreadcrumb[]) => void;
  resetBreadcrumbs: () => void;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
