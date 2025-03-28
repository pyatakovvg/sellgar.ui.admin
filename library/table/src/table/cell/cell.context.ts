import React from 'react';

interface IColumn {
  data: any;
  deps: number;
}

export const context = React.createContext({} as IColumn);
export const Provider = context.Provider;
