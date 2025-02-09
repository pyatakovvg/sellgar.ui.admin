import React from 'react';

import { Property } from './components/Property';
import { ModuleProvider } from './ModuleProvider.tsx';

export function Module() {
  return (
    <ModuleProvider>
      <Property />
    </ModuleProvider>
  );
}
