import React from 'react';

import { BreadcrumbPresenter } from './classes/breadcrumb.presenter.ts';

import { Provider } from './breadcrumbs.context.ts';

export const BreadcrumbsProvider: React.FC<React.PropsWithChildren> = (props) => {
  return <Provider value={{ presenter: new BreadcrumbPresenter() }}>{props.children}</Provider>;
};
