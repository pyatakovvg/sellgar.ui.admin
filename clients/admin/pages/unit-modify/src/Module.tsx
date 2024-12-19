import React from 'react';

import { Unit } from './components/Unit';
import { ModuleProvider } from './ModuleProvider.tsx';

export function Module() {
  return (
    <ModuleProvider>
      <Unit />
    </ModuleProvider>
  );
}
