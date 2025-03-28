import React from 'react';

export interface ITree<T> {
  accessor: keyof T;
  defaultExpanded?: boolean;
}

export interface IContext<T> {
  tree?: ITree<T>;
}

const defaultValues: IContext<any> = {};

export const context = React.createContext(defaultValues);
export const Provider = context.Provider;
