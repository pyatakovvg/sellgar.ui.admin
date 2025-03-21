import React from 'react';

import { Unit } from './components/Unit';
import { ModuleProvider } from './module.provider.tsx';

import { controller } from './classes/classes.di.ts';

export const loader = async () => {
  await controller.findAll();
};

export const Module = () => {
  return (
    <ModuleProvider>
      <Unit />
    </ModuleProvider>
  );
};
