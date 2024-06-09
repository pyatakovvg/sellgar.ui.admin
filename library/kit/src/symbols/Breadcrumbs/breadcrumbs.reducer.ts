import React from 'react';

import type { IBreadcrumb } from './breadcrumbs.types.ts';

interface IState {
  isProcess: boolean;
  breadcrumbs: IBreadcrumb[];
}

export enum BreadcrumbsActionKind {
  SET = 'SET',
  ADD = 'ADD',
  RESET = 'RESET',
}

interface BreadcrumbsAction {
  type: BreadcrumbsActionKind;
  payload: IBreadcrumb[] | IBreadcrumb;
}

export const breadcrumbsReducer = (state: IState, action: BreadcrumbsAction): React.ReducerAction<any> => {
  const { type, payload } = action;

  switch (type) {
    case BreadcrumbsActionKind.SET: {
      return { ...state, breadcrumbs: [...(payload as IBreadcrumb[])] };
    }
    case BreadcrumbsActionKind.ADD: {
      return { ...state, breadcrumbs: [...state.breadcrumbs, payload as IBreadcrumb] };
    }
    case BreadcrumbsActionKind.RESET: {
      return { ...state, breadcrumbs: [] };
    }
    default:
      return state;
  }
};
