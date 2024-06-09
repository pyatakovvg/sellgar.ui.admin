import React from 'react';

import type { IBreadcrumb } from './breadcrumbs.types.ts';

import { Provider } from './breadcrumbs.context.ts';
import { breadcrumbsReducer, BreadcrumbsActionKind } from './breadcrumbs.reducer.ts';

export const BreadcrumbsProvider: React.FC<React.PropsWithChildren> = (props) => {
  // @ts-ignore
  const [state, dispatch] = React.useReducer(breadcrumbsReducer, {
    breadcrumbs: [],
  });

  const addBreadcrumb = React.useCallback(
    // @ts-ignore
    (payload: IBreadcrumb) => dispatch({ type: BreadcrumbsActionKind.ADD, payload }),
    [],
  );
  const setBreadcrumbs = React.useCallback(
    // @ts-ignore
    (payload: IBreadcrumb[]) => dispatch({ type: BreadcrumbsActionKind.SET, payload }),
    [],
  );
  const resetBreadcrumbs = React.useCallback(
    // @ts-ignore
    () => dispatch({ type: BreadcrumbsActionKind.RESET, payload: [] }),
    [],
  );

  return (
    <Provider
      value={{
        breadcrumbs: state.breadcrumbs,
        setBreadcrumbs,
        addBreadcrumb,
        resetBreadcrumbs,
      }}
    >
      {props.children}
    </Provider>
  );
};
