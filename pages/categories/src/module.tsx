import { ApplicationModule } from '@library/app';

import React from 'react';

import { Category } from './components/Category';
import { ModuleProvider } from './module.provider.tsx';

import { controller } from './classes/classes.di.ts';

export class Module implements ApplicationModule {
  async loader() {
    await controller.findAll();
  }

  render() {
    return (
      <ModuleProvider>
        <Category />
      </ModuleProvider>
    );
  }
}
