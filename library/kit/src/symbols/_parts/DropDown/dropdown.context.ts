import React from 'react';

interface IContext {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
