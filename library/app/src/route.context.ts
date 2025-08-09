import React from 'react';

export interface IContext<T> {
  data: T;
}

export const context = React.createContext({} as IContext<any>);
export const Provider = context.Provider;
