import { ApplicationModule } from '@library/app';

import React from 'react';

import { CategoryView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { CategoryControllerInterface } from './classes/controller/category-controller.interface.ts';
import { create, destroy } from './classes/classes.di.ts';

export class Module implements ApplicationModule {
  private readonly container = create();
  private readonly controller = this.container.get(CategoryControllerInterface);

  destroy() {
    destroy();
  }

  async loader() {
    await this.controller.findAll();
  }

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <CategoryView />
      </ModuleProvider>
    );
  }
}
