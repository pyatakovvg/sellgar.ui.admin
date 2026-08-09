import React from 'react';

interface IVariantContext {
  index: number;
  canDelete: boolean;
  copy(): void;
  delete(): void;
}

export const VariantContext = React.createContext<IVariantContext | null>(null);
