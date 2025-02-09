import React from 'react';

import { Products } from './components/Products';
import { ModuleProvider } from './ModuleProvider.tsx';

export function Module() {
  return (
    <ModuleProvider>
      <Products />
    </ModuleProvider>
  );
}
