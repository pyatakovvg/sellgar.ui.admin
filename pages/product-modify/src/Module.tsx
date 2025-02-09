import React from 'react';

import { Product } from './components/Product';
import { ModuleProvider } from './ModuleProvider.tsx';

export function Module() {
  return (
    <ModuleProvider>
      <Product />
    </ModuleProvider>
  );
}
