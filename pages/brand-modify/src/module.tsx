import React from 'react';

import { Brand } from './components/Brand';
import { ModuleProvider } from './module.provider.tsx';

import { controller } from './classes/classes.di.ts';

export const loader = async ({ params }: any) => {
  await controller.findByUuid(params.uuid);
};

export function Module() {
  return (
    <ModuleProvider>
      <Brand />
    </ModuleProvider>
  );
}
