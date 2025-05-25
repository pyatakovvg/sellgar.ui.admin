import React from 'react';

interface IColumn<T> {
  data: T;
  deps: number;
}

export const context = React.createContext({} as IColumn<any>);
export const Provider = context.Provider;
