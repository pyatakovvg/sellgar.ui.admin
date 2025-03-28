import React from 'react';

export interface IColumn<T> {
  accessor?: keyof T;
  width?: number;
  dynamicWidth: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
}

export const context = React.createContext({} as IColumn<any>);
export const Provider = context.Provider;
