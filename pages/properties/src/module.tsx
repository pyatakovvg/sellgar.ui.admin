import React from 'react';

import { Property } from './components/Property';
import { ModuleProvider } from './module.provider.tsx';

import { controller } from './classes/classes.di.ts';

export const loader = async () => {
  await controller.findAll();
};

export const Module = () => {
  return (
    <ModuleProvider>
      <Property />
    </ModuleProvider>
  );
};
