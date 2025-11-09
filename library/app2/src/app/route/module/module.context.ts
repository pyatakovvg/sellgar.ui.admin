import React from 'react';

interface IContext<T> {
  controller: T;
}

export const context = React.createContext({} as IContext<any>);
export const Provider = context.Provider;
