import React from 'react';

import { container } from './classes/classes.di.ts';
import { Provider } from './breadcrumbs.context.ts';
import { BreadcrumbPresenter, BreadcrumbPresenterSymbol } from './classes/presenters/breadcrumb.presenter.ts';

export const BreadcrumbsProvider: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <Provider value={{ presenter: container.get<BreadcrumbPresenter>(BreadcrumbPresenterSymbol) }}>
      {props.children}
    </Provider>
  );
};
