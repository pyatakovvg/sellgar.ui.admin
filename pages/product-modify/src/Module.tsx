import React from 'react';

import { Product } from './components/Product';
import { ModuleProvider } from './ModuleProvider.tsx';

import { controller } from './classes/classes.di.ts';

export const loader = async ({ params }: any) => {
  await controller.findProperties();
  if (params.uuid) {
    return await controller.findByUuid(params.uuid);
  }
  return null;
};

export function Module() {
  return (
    <ModuleProvider>
      <Product />
    </ModuleProvider>
  );
}
