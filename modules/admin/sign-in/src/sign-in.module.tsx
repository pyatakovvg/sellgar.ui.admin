import React from 'react';

import { SignInView } from './components';
import { ModuleProvider } from './ModuleProvider.tsx';

export function Module() {
  return (
    <ModuleProvider>
      <SignInView />
    </ModuleProvider>
  );
}
