import React from 'react';

interface IVariantsContext {
  add(): void;
}

export const VariantsContext = React.createContext<IVariantsContext | null>(null);
