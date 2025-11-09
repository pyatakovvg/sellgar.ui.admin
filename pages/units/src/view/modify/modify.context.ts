import React from 'react';

interface IContext {
  uuid?: string;
  isOpen: boolean;
  onOpen(uuid?: string): void;
  onClose(): void;
}

export const context = React.createContext({} as IContext);
export const Provider = context.Provider;
