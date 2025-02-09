import React from 'react';

import { PropertyGroup } from './components/PropertyGroup';
import { ModuleProvider } from './ModuleProvider.tsx';

export function Module() {
  return (
    <ModuleProvider>
      <PropertyGroup />
    </ModuleProvider>
  );
}
