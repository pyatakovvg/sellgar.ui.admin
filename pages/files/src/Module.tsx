import React from 'react';

import { Files } from './components/Files';
import { ModuleProvider } from './ModuleProvider.tsx';

export function Module() {
  return (
    <ModuleProvider>
      <Files />
    </ModuleProvider>
  );
}
