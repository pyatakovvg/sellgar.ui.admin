import React from 'react';

export interface IColumn<T> {
  data: T;
  deps: number;
  hasExpanded: boolean;
  expanded: boolean;
  setExpand(state: boolean): void;
}

export const context = React.createContext({} as IColumn<any>);
export const Provider = context.Provider;
