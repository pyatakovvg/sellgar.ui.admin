import React from 'react';

import { SignInView } from './components';
import { ModuleProvider } from './ModuleProvider.tsx';

export const loader = () => {
  return true;
};

export const Module = () => {
  return (
    <ModuleProvider>
      <SignInView />
    </ModuleProvider>
  );
};
