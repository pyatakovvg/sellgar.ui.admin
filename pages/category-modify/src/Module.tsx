import React from 'react';

import { Category } from './components/Category';
import { ModuleProvider } from './ModuleProvider.tsx';

export function Module() {
  return (
    <ModuleProvider>
      <Category />
    </ModuleProvider>
  );
}
