import React from 'react';

import { Products } from './components/Products';
import { ModuleProvider } from './ModuleProvider.tsx';

import { controller } from './classes/classes.di.ts';

export const loader = async () => {
  await controller.findAll();
};

export const Module = () => {
  return (
    <ModuleProvider>
      <Products />
    </ModuleProvider>
  );
};
