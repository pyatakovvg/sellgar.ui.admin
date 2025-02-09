import React from 'react';

import { Brand } from './components/Brand';
import { ModuleProvider } from './ModuleProvider.tsx';

export function Module() {
  return (
    <ModuleProvider>
      <Brand />
    </ModuleProvider>
  );
}
